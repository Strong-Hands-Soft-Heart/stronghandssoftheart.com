// Answers an AI agent that asks for Markdown (Accept: text/markdown) at an address with no page.
// vercel.json sends only those requests here, and only after the site's own files miss, so a
// browser still gets the normal HTML 404 and every real page is untouched.
const BODY = `# Page not found (404)

There is no page at this address on Strong Hands, Soft Heart. The link may be old or mistyped.

Try one of these instead:

- [llms.txt](https://www.stronghandssoftheart.com/llms.txt): a plain-text guide to this site, written for AI agents
- [Sitemap](https://www.stronghandssoftheart.com/sitemap-index.xml): the address of every page
- [Home page](https://www.stronghandssoftheart.com/)
`;

export default {
  fetch() {
    return new Response(BODY, {
      status: 404,
      headers: {
        'content-type': 'text/markdown; charset=utf-8',
        'cache-control': 'public, max-age=3600',
        vary: 'Accept',
        'x-robots-tag': 'noindex',
      },
    });
  },
};
