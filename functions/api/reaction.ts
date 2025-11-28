import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/cloudflare-pages'

const app = new Hono<{ Bindings: Env }>()
app.use('/*', cors())

const EMOJIS = ['👍️', '❤️', '🎉', '🚀', '👀'] as const
const USER_ID = '1'

type Env = {
	REACTION: KVNamespace
}

type CountRecord = Record<(typeof EMOJIS)[number], number>

const routes = ['/', '/api/reaction'] as const

const getReaction = async (slug: string, env: Env) => {
	const countsKey = `reaction:count:${slug}`
	const userKey = `reaction:user:${slug}:${USER_ID}`

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

const postReaction = async (slug: string, target: string, reacted: boolean, env: Env) => {
	const countsKey = `reaction:count:${slug}`
	const userKey = `reaction:user:${slug}:${USER_ID}`

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

routes.forEach((path) => {
	app.get(path, async (c) => {
		const slug = c.req.query('slug')
		if (!slug) return c.json({}, 400)
		const payload = await getReaction(slug, c.env)
		return c.json(payload)
	})

	app.post(path, async (c) => {
		const body = await c.req.json().catch(() => null)
		const slug = body?.slug
		const target = body?.target
		const reacted = body?.reacted

		if (!slug || typeof slug !== 'string') return c.json({ success: false }, 400)
		if (!EMOJIS.includes(target)) return c.json({ success: false }, 400)
		if (typeof reacted !== 'boolean') return c.json({ success: false }, 400)

		await postReaction(slug, target, reacted, c.env)
		return c.json({ success: true })
	})
})

export const onRequest = handle(app)
