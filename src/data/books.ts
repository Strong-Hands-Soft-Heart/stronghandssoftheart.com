import type { ImageMetadata } from 'astro';
import miaArt from '../assets/books/mia-card.png';
import bentArt from '../assets/books/the-bent-one.png';

/** Titles and descriptions come from each book's own site, in both languages. */
export interface Book {
  slug: string;
  title: string;
  titleEs: string;
  summary: string;
  summaryEs: string;
  url: string;
  repo: string;
  art: ImageMetadata;
  artAlt: string;
}

export const books: Book[] = [
  {
    slug: 'mia-the-sun-and-the-moon',
    title: 'Mia, the Sun, and the Moon',
    titleEs: 'Mia, el Sol y la Luna',
    summary: 'A free picture book about Mia, the sun, and the moon. Read it in English or Spanish.',
    summaryEs: 'Un cuento gratis sobre Mia, el sol y la luna. Léelo en inglés o en español.',
    url: 'https://mia-the-sun-and-the-moon-web-book.stronghandssoftheart.com',
    repo: 'https://github.com/antoniwan/book-sun-and-moon',
    art: miaArt,
    artAlt: 'The Mia cover card: a sun and a crescent moon above the word Mia.',
  },
  {
    slug: 'the-bent-one',
    title: 'The Bent One',
    titleEs: 'La Doblada',
    summary: 'A little book about a red line with a bend. You can read it in English or Spanish.',
    summaryEs:
      'Un cuentito sobre una línea roja con un doblez. Lo puedes leer en inglés o en español.',
    url: 'https://the-bent-one-book.stronghandssoftheart.com',
    repo: 'https://github.com/antoniwan/the-bent-one',
    art: bentArt,
    artAlt: 'A red line with one bend on warm paper.',
  },
];

export const BOOK_LICENSE =
  'Story and art: CC BY-NC 4.0. Share and adapt them for non-commercial use, with credit. Code: MIT.';
