import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/cloudflare-pages'

const app = new Hono()
app.use('/*', cors())

const EMOJIS = ['👍️', '❤️', '🎉', '🚀', '👀'] as const
const USER_ID = '1'

type Env = {
	REACTION: KVNamespace
}

type CountRecord = Record<(typeof EMOJIS)[number], number>

// https://github.com/isunjn/serene/blob/d13dc8def6257dadd911bc018699835b51c50951/USAGE.md#L268-L281
app.get('/api/reaction', async (c) => {
	const slug = c.req.query('slug')
	if (!slug) return c.json({}, 400)

	const countsKey = `reaction:count:${slug}`
	const userKey = `reaction:user:${slug}:${USER_ID}`

	const countsRaw = await c.env.REACTION.get(countsKey)
	const userRaw = await c.env.REACTION.get(userKey)

	const counts: CountRecord = countsRaw
		? JSON.parse(countsRaw)
		: Object.fromEntries(EMOJIS.map((e) => [e, 0])) as CountRecord
	const userSet = new Set<string>(userRaw ? JSON.parse(userRaw) : [])

	const payload = Object.fromEntries(
		EMOJIS.map((emoji) => [emoji, [counts[emoji] ?? 0, userSet.has(emoji)]]),
	)
	return c.json(payload)
})

// https://github.com/isunjn/serene/blob/d13dc8def6257dadd911bc018699835b51c50951/USAGE.md#L283-L301
app.post('/api/reaction', async (c) => {
	const body = await c.req.json().catch(() => null)
	const slug = body?.slug
	const target = body?.target
	const reacted = body?.reacted

	if (!slug || typeof slug !== 'string') return c.json({ success: false }, 400)
	if (!EMOJIS.includes(target)) return c.json({ success: false }, 400)
	if (typeof reacted !== 'boolean') return c.json({ success: false }, 400)

	const countsKey = `reaction:count:${slug}`
	const userKey = `reaction:user:${slug}:${USER_ID}`

	const countsRaw = await c.env.REACTION.get(countsKey)
	const counts: CountRecord = countsRaw
		? JSON.parse(countsRaw)
		: Object.fromEntries(EMOJIS.map((e) => [e, 0])) as CountRecord

	const userRaw = await c.env.REACTION.get(userKey)
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
		c.env.REACTION.put(countsKey, JSON.stringify(counts)),
		c.env.REACTION.put(userKey, JSON.stringify([...userSet])),
	])

	return c.json({ success: true })
})

export const onRequest = handle(app)
