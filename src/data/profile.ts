/**
 * YOUR IDENTITY - start here.
 *
 * Everything that says who you are lives in this file: name, handle, photo,
 * socials, email and the Home headline. Every value below is a PLACEHOLDER.
 * Replace the text, or hand this file to your AI assistant and tell it what
 * to put in each field.
 *
 * Page-specific copy (projects, services, testimonials, FAQs) lives in the
 * other files in src/data/ and at the top of each view component.
 */

import { Briefcase, SealCheck, Clock, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

/** A proof fact on the phone's Home: a glyph, a short value, a caption. */
export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  /** First name, used in "Hi, I'm ___." on About. */
  firstName: string
  handle: string
  /** Short role line under the handle on phones. */
  role: string
  /** Square image. An SVG, WebP or PNG with a transparent background looks best. */
  avatarSrc: string
  /** Tooltip / screen-reader label on the verified tick next to your name. */
  verifiedLabel: string
  email: string
  whatsapp: { label: string; number: string; href: string }
  location: string
  /** Three short proof facts shown on phones under the Home lede. */
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Jayvee Lyn Barbacena',
  firstName: 'Jayvee Lyn',
  handle: 'Remote Administrative Support',
  role: 'Administrative & Customer Support',
  avatarSrc: '/profile.jpg',
  verifiedLabel: 'Profile information',
  email: 'veelynbarbacena@gmail.com',
  whatsapp: {
    label: 'WhatsApp / Mobile',
    number: '+63 981 383 6142',
    href: 'https://wa.me/639813836142',
  },
  location: 'Meycauayan City, Bulacan, Philippines',
  // Pick any icon from https://phosphoricons.com and import it above.
  stats: [
    { value: 'B.S. Civil', label: 'Engineering', Icon: Briefcase },
    { value: 'Top Agent', label: 'Q2 2025', Icon: SealCheck },
    { value: 'Full-time', label: 'Availability', Icon: Clock },
  ],
  // The intro types this line, then flies it into the Home headline.
  // Keep it short: two halves, 5-8 words total.
  displayName: { line1: 'Reliable support for', line2: 'your everyday operations.' },
  hero: {
    body: 'I combine an engineering mindset with customer support and administrative skills to help businesses stay organized and productive.',
    portraitSrc: '/profile.jpg',
    portraitAlt: 'Portrait of Jayvee Lyn Barbacena',
  },
  socials: [],
}
