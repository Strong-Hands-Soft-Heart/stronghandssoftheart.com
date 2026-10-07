import type { APIRoute } from 'astro';
import { BOOK_LICENSE, books } from '../data/books';
import { services } from '../data/consulting';
import { crafts, music } from '../data/crafts';
import { network } from '../data/network';
import { NOTES_URL, SITE } from '../config/site';

/** `/llms.txt` (https://llmstxt.org): the site for AI agents, built from the same data as the pages. */
export const GET: APIRoute = () => {
  const url = (path: string) => new URL(path, SITE.url).href;

  const body = `# ${SITE.legalName}

> Soap, books and software, made by one person in Florida: ${SITE.founder}.

${SITE.name} (SH&SH) is ${SITE.founder}'s company: one person, in Florida, from Puerto Rico. Every status below uses one vocabulary: Available, Free, In progress, Planned (with a date), Paused, Retired.

${crafts.map((craft) => `- ${craft.title} (${craft.status}): ${craft.body}`).join('\n')}
- ${music.title} (${music.status}): ${music.body}

The company is one person with a wide network. When a project needs more than ${SITE.founder}, he brings in or introduces professionals he trusts in the areas where he is not the expert, in these fields: ${network.join(', ')}. When someone else does part of the work, he names them.

To get in touch, use the contact form on the consulting page or email ${SITE.email}.

## Site

- [Home](${url('/')}): what SH&SH makes and the status of each
- [Cold-Process Soap](${url('/soap')}): the first product, and the sign-up for launch news
- [Children's Books](${url('/books')}): two free bilingual picture books
- [Notes](${url('/notes')}): the founder's own writing, which is his and not the company's, with the latest essays
- [AI and Engineering Consulting](${url('/consulting')}): ${services.map((s) => s.title).join('; ')}; and the contact form
- [About](${url('/about')}): who is behind the company, and its values

## Books

${books.map((book) => `- [${book.title} / ${book.titleEs}](${book.url}/llms.txt): ${book.summary}`).join('\n')}

${BOOK_LICENSE}

## Related

- [Notes](${NOTES_URL}/llms.txt): every essay, with a markdown copy of each
- [Code](${SITE.founderUrl}/code): the founder's projects and open source
- [${SITE.founder}](${SITE.founderUrl}/llms.txt): all of the founder's links

## Optional

- [The SH&SH Logo](${url('/logo')}): an essay on the mark
- [Privacy Policy](${url('/privacy-policy')})
- [Terms of Service](${url('/terms-of-service')})
- [Product Disclaimers](${url('/product-disclaimers')})
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
