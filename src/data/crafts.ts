import type { IconName } from '../components/icons';

/**
 * Status uses the design system's exact vocabulary: Available, Free, In progress,
 * Planned (with a date), Paused (with since when), Retired. Nothing else.
 */
export interface Craft {
  icon: IconName;
  title: string;
  status: string;
  body: string;
  linkLabel: string;
  href: string;
}

export const crafts: Craft[] = [
  {
    icon: 'beaker',
    title: 'Cold-Process Soap',
    status: 'Planned: late 2026',
    body: 'Cold-process soap, made in small batches in Florida. Not for sale yet; the first bars are planned for late 2026.',
    linkLabel: 'Soap Updates',
    href: '/soap',
  },
  {
    icon: 'book-open',
    title: "Children's Books",
    status: 'Free',
    body: 'Two short picture books, written for my kids and my nephew, free to read in English and Spanish.',
    linkLabel: 'Read the Books',
    href: '/books',
  },
  {
    icon: 'code',
    title: 'AI and Engineering Consulting',
    status: 'Available',
    body: 'Architecture, AI enablement, hands-on engineering and advisory. When a project needs more than me, I bring in people I know.',
    linkLabel: 'Consulting',
    href: '/consulting',
  },
];

/** Music gets one quiet line, not a card. */
export const music = {
  icon: 'headphones' as IconName,
  title: 'Music',
  status: 'In progress',
  body: 'I record metal albums with friends. Nothing is released here yet.',
};
