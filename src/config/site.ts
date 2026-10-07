export const SITE = {
  name: 'Strong Hands, Soft Heart',
  legalName: 'Strong Hands, Soft Heart LLC',
  url: 'https://www.stronghandssoftheart.com',
  description:
    'Soap, books and software, made by one person in Florida. Cold-process soap planned for late 2026, two free bilingual picture books, Notes, and AI and engineering consulting.',
  email: 'hello@stronghandssoftheart.com',
  founder: 'Antonio Rodríguez Martínez',
  founderUrl: 'https://antoniwan.online',
};

/**
 * Kit form for soap and launch updates. Paste the form's ID here once it exists.
 * While it is empty, the signup form posts to Formspree instead, and the list is
 * imported into Kit later.
 */
export const KIT_FORM_ID = '';

/** Formspree form used by the contact form (and by signups until Kit is set). */
export const FORMSPREE_FORM_ID = 'mzzrdgpe';

/** Google Analytics, the same property as the previous site. */
export const GA_ID = 'G-B11WKDN29L';

export const NOTES_URL = 'https://notes.antoniwan.online';

export const NAV = [
  { label: 'Soap', href: '/soap' },
  { label: 'Books', href: '/books' },
  { label: 'Notes', href: '/notes' },
  { label: 'Consulting', href: '/consulting' },
  { label: 'About', href: '/about' },
] as const;
