import type { IconName } from '../components/icons';

/** From consulting.stronghandssoftheart.com (retired October 2026), trimmed to facts. */

export interface Service {
  icon: IconName;
  title: string;
  meta: string;
  body: string;
}

export const services: Service[] = [
  {
    icon: 'code',
    title: 'AI Enablement',
    meta: 'Strategy · Rapid prototyping · Guardrails · Team onboarding',
    body: 'Design and integrate AI workflows that reduce cognitive load, from internal tools to customer-facing products.',
  },
  {
    icon: 'layers',
    title: 'Systems and Product Architecture',
    meta: 'Microservices · APIs · Roadmaps · Migration planning',
    body: 'Clarify system boundaries, data flows and the product surface, including microservices and API design, so later changes are easier to reason about.',
  },
  {
    icon: 'wrench',
    title: 'Hands-On Engineering and Reviews',
    meta: 'Next.js · TypeScript · React · APIs · Documentation',
    body: 'Ship key features or refactors with code, documentation and tests, and hand the knowledge over so your team can maintain the work.',
  },
  {
    icon: 'users',
    title: 'Product and Leadership Advisory',
    meta: '1:1 advisory · Product thinking · Mentorship',
    body: 'For founders, product managers, engineering leads, and engineers who want mentorship on growth, focus and team dynamics.',
  },
];

export const steps = [
  {
    title: 'Listen',
    body: 'I start with your constraints, your people, and the problems that hurt. Then I map the system so everyone sees the same picture.',
  },
  {
    title: 'Design',
    body: "We agree on a plan that fits your team's capacity and risk.",
  },
  {
    title: 'Build',
    body: 'I ship in small, observable steps. I document, pair, and hand the knowledge over so your team can maintain the work.',
  },
];

/** LinkedIn recommendations, quoted as written. */
export const testimonials = [
  {
    name: 'Rodrigo Arija',
    role: 'CEO, Manifesto Solutions (client)',
    quote:
      'Razor-sharp project direction with high level technical expertise. As a Director or a leader, Antonio earns my highest recommendation.',
  },
  {
    name: 'Julian Saenz',
    role: 'Senior Full Stack Engineer',
    quote:
      'Great direct manager and mentor. Pushed the team to be innovative and protected engineers from the noise. We went on to do great things under his direction.',
  },
  {
    name: 'Jayson Fittipaldi',
    role: 'Co-Founder, Chief Innovation Officer',
    quote:
      "Technical knowledge combined with a strong 'we can figure it out' attitude — great to brainstorm with and lead projects through deployment.",
  },
  {
    name: 'Jessica Rodriguez',
    role: 'Content Marketing Strategist, JR Marketing Consulting',
    quote:
      'Most knowledgeable professional I know with expertise in all things digital technology. Not only is he an expert in his field, but a fantastic leader and colleague.',
  },
  {
    name: 'Isis Zeledon',
    role: 'Interactive and Visual Designer',
    quote:
      'Font of knowledge when it comes to digital and technology. No matter how complex a problem is, his analytical and creative mind would always come up with the right solution. I unreservedly endorse him.',
  },
];

export const reading = [
  { title: "The Manager's Path", author: 'Camille Fournier' },
  { title: 'High Output Management', author: 'Andrew S. Grove' },
  { title: 'Fundamentals of Software Architecture', author: 'Mark Richards and Neal Ford' },
  { title: 'Building Evolutionary Architectures', author: 'Neal Ford' },
  { title: 'Modern Software Engineering', author: 'David Farley' },
  { title: 'User Story Mapping', author: 'Jeff Patton' },
  { title: 'Ruined by Design', author: 'Mike Monteiro' },
  { title: 'Nonviolent Communication', author: 'Marshall B. Rosenberg' },
];

export const selectedWork = [
  {
    title: 'Builds.software',
    href: 'https://builds.software',
    body: 'My portfolio of engineering and product work.',
  },
  {
    title: 'Notes',
    href: 'https://notes.antoniwan.online',
    body: 'An Astro site I built and run: about 130 essays and recipes, with an llms.txt and a markdown copy of every post.',
  },
  {
    title: 'GitHub',
    href: 'https://github.com/antoniwan',
    body: 'Code, repositories, and open contributions.',
  },
];
