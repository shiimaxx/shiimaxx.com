import { Hono } from 'hono'
import type { Context } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/cloudflare-pages'
import { getCookie, setCookie } from 'hono/cookie'

const app = new Hono<{ Bindings: Env }>()
app.use('/*', cors())

const EMOJIS = ['👍️', '❤️', '🎉', '🚀', '👀'] as const
const COOKIE_NAME = 'reaction_uid'

type Env = {
	REACTION: KVNamespace
}

type CountRecord = Record<(typeof EMOJIS)[number], number>
type AppContext = Context<{ Bindings: Env }>

const ensureUserId = (c: AppContext) => {
	const existing = getCookie(c, COOKIE_NAME)
	if (existing) return existing

	const newId = crypto.randomUUID()

	setCookie(c, COOKIE_NAME, newId, {
		path: '/api/reaction',
		httpOnly: true,
		sameSite: 'Strict',
		secure: new URL(c.req.url).protocol === 'https:',
		maxAge: 60 * 60 * 24 * 365,
	})

	return newId
}

const getReaction = async (slug: string, userId: string, env: Env) => {
	const countsKey = `reaction:count:${slug}`
	const userKey = `reaction:user:${slug}:${userId}`

	const countsRaw = await env.REACTION.get(countsKey)
	const userRaw = await env.REACTION.get(userKey)

	const counts: CountRecord = countsRaw
		? JSON.parse(countsRaw)
		: Object.fromEntries(EMOJIS.map((e) => [e, 0])) as CountRecord
	const userSet = new Set<string>(userRaw ? JSON.parse(userRaw) : [])

	return Object.fromEntries(
		EMOJIS.map((emoji) => [emoji, [counts[emoji] ?? 0, userSet.has(emoji)]]),
	)
}

const postReaction = async (slug: string, target: string, reacted: boolean, userId: string, env: Env) => {
	const countsKey = `reaction:count:${slug}`
	const userKey = `reaction:user:${slug}:${userId}`

	const countsRaw = await env.REACTION.get(countsKey)
	const counts: CountRecord = countsRaw
		? JSON.parse(countsRaw)
		: Object.fromEntries(EMOJIS.map((e) => [e, 0])) as CountRecord

	const userRaw = await env.REACTION.get(userKey)
	const userSet = new Set<string>(userRaw ? JSON.parse(userRaw) : [])

	const currentlyReacted = userSet.has(target)
	if (reacted && !currentlyReacted) {
		counts[target] = (counts[target] ?? 0) + 1
		userSet.add(target)
	} else if (!reacted && currentlyReacted) {
		counts[target] = Math.max(0, (counts[target] ?? 0) - 1)
		userSet.delete(target)
	}

	await Promise.all([
		env.REACTION.put(countsKey, JSON.stringify(counts)),
		env.REACTION.put(userKey, JSON.stringify([...userSet])),
	])
}

app.get('/api/reaction', async (c) => {
	const slug = c.req.query('slug')
	if (!slug) return c.json({}, 400)
	const userId = ensureUserId(c)
	const payload = await getReaction(slug, userId, c.env)
	return c.json(payload)
})

app.post('/api/reaction', async (c) => {
	const body = await c.req.json().catch(() => null)
	const slug = body?.slug
	const target = body?.target
	const reacted = body?.reacted

	if (!slug || typeof slug !== 'string') return c.json({ success: false }, 400)
	if (!EMOJIS.includes(target)) return c.json({ success: false }, 400)
	if (typeof reacted !== 'boolean') return c.json({ success: false }, 400)

	const userId = ensureUserId(c)
	await postReaction(slug, target, reacted, userId, c.env)
	return c.json({ success: true })
})

export const onRequest = handle(app)
