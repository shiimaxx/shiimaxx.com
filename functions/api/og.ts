import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'
import { ImageResponse } from 'workers-og'

const app = new Hono()

const SITE_NAME = 'Contextual'
const SITE_DOMAIN = 'shiimaxx.com'
const ACCENT_NAVY = '#1A2845'
const TITLE_MAX_LENGTH = 120

const escapeHtml = (s: string): string =>
	s.replace(/[&<>"']/g, (c) => {
		switch (c) {
			case '&': return '&amp;'
			case '<': return '&lt;'
			case '>': return '&gt;'
			case '"': return '&quot;'
			case "'": return '&#39;'
			default: return c
		}
	})

const loadFont = async (text: string): Promise<ArrayBuffer> => {
	const cssUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${encodeURIComponent(text)}`
	const css = await fetch(cssUrl, {
		headers: {
			// Empty UA forces Google Fonts to return TTF (truetype) instead of WOFF2,
			// which Satori (used by workers-og) requires.
			'User-Agent': '',
		},
	}).then((r) => r.text())

	const fontUrl = css.match(/src:\s*url\((.+?)\)/)?.[1]
	if (!fontUrl) throw new Error('failed to extract font URL from Google Fonts CSS')

	return await fetch(fontUrl).then((r) => r.arrayBuffer())
}

app.get('/api/og', async (c) => {
	const titleParam = c.req.query('title')
	if (!titleParam) return c.json({ error: 'title is required' }, 400)

	const title = titleParam.slice(0, TITLE_MAX_LENGTH)
	const fontText = title + SITE_NAME + SITE_DOMAIN
	const font = await loadFont(fontText)

	const html = `<div style="display: flex; flex-direction: column; width: 100%; height: 100%; background: #ffffff; font-family: 'Noto Sans JP';"><div style="display: flex; flex: 1; align-items: center; padding: 96px 96px 0 96px;"><div style="display: flex; font-size: 72px; line-height: 1.35; color: ${ACCENT_NAVY}; font-weight: 700;">${escapeHtml(title)}</div></div><div style="display: flex; justify-content: space-between; align-items: center; background: ${ACCENT_NAVY}; color: #ffffff; padding: 28px 96px; font-size: 32px; font-weight: 700;"><span>${escapeHtml(SITE_NAME)}</span><span>${escapeHtml(SITE_DOMAIN)}</span></div></div>`

	return new ImageResponse(html, {
		width: 1200,
		height: 630,
		format: 'png',
		fonts: [{ name: 'Noto Sans JP', data: font, weight: 700 }],
		headers: {
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	})
})

export const onRequest = handle(app)
