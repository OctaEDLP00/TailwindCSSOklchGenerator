import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { Code } from 'astro-expressive-code/components'
import type { APIRoute } from 'astro'

/**
 * API Route to render Expressive Code components on demand.
 * @type {APIRoute}
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const { code, lang, class: className } = await request.json()

    if (!code) {
      return new Response(JSON.stringify({ error: 'No code provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Create container and render the component
    const container = await AstroContainer.create()
    const html = await container.renderToString(Code, {
      props: { code, lang: lang || 'css', class: className },
    })

    return new Response(JSON.stringify({ html }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error rendering code:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
