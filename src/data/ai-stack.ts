/**
 * The systems tree shown in the Projects "systems" pop-up (and as chips on
 * Home and in the Projects bento card).
 *
 * This file is the ONLY place node copy lives. AIStack.tsx and AIStackGrid.tsx
 * render whatever shape they find here, so swapping in content is a data edit
 * and never a JSX edit. Keep the exported names and types stable.
 *
 * Every value below is a PLACEHOLDER. Shape rules:
 * - The root is you. Its children are the categories (branches).
 * - A branch with `status` is itself a system; a branch without one is a
 *   group whose children are the systems.
 * - Status is what the thing actually does today: "Live" (in use by others),
 *   "Internal" (works, you use it), "Beta".
 * - Logo marks in AIStackGrid.tsx are keyed by the node `id` below.
 */

import {
  Sparkle,
  Article,
  UsersThree,
  ChatCircleDots,
  Browser,
  Broadcast,
  Robot,
} from '@/components/slab'
import type { Icon } from '@/components/slab'
import { profile } from '@/data/profile'

export type StackStatus = 'Live' | 'Internal' | 'Beta'

/** A vendor mark, masked to a single ink colour so the row reads as one set
 *  rather than a rainbow of brand palettes. Only marks that already exist in
 *  public/icons are listed. */
export type StackLogo = { src: string; name: string }

export type StackNode = {
  id: string
  name: string
  /** One plain sentence a non-technical client understands. */
  what: string
  /** Real stack / model / where it runs. Rendered small and muted. */
  stack?: string
  status?: StackStatus
  /** Phosphor glyph for the card's mark tile. Every node has one. */
  Icon: Icon
  logos?: StackLogo[]
  children?: StackNode[]
}

const GOOGLE_WORKSPACE: StackLogo = { src: '/icons/googleworkspace.svg', name: 'Google Workspace' }
const ZENDESK: StackLogo = { src: '/icons/zendesk.svg', name: 'Zendesk' }
const CHATGPT: StackLogo = { src: '/icons/openai.svg', name: 'ChatGPT' }

/** The listed digital tools, grouped by the kind of support they enable. */
export const aiStack: StackNode = {
  id: 'root',
  Icon: Sparkle,
  name: profile.name,
  what: 'Digital tools used for administrative support, customer service, and AI-assisted productivity.',
  stack: 'Digital tools and platforms',
  children: [
    {
      id: 'productivity',
      Icon: Article,
      name: 'Productivity & Office',
      what: 'Tools for organizing information, documents, and daily work.',
      children: [
        {
          id: 'google-workspace',
          Icon: Article,
          logos: [GOOGLE_WORKSPACE],
          name: 'Google Workspace',
          what: 'Email, documents, calendars, and shared files.',
        },
        {
          id: 'microsoft-office',
          Icon: Article,
          name: 'Microsoft Office',
          what: 'Office productivity tools listed among my skills.',
        },
        {
          id: 'notion',
          Icon: Browser,
          name: 'Notion',
          what: 'A digital workspace for notes and organization.',
        },
      ],
    },
    {
      id: 'communication',
      Icon: UsersThree,
      name: 'Customer Support & Communication',
      what: 'Platforms for customer conversations and remote collaboration.',
      children: [
        {
          id: 'zendesk',
          Icon: ChatCircleDots,
          logos: [ZENDESK],
          name: 'Zendesk',
          what: 'Customer support platform.',
        },
        {
          id: 'zoom',
          Icon: Broadcast,
          name: 'Zoom',
          what: 'Video meetings and remote communication.',
        },
        {
          id: 'google-meet',
          Icon: Broadcast,
          name: 'Google Meet',
          what: 'Video meetings and remote communication.',
        },
      ],
    },
    {
      id: 'ai-content',
      Icon: Robot,
      name: 'AI & Digital Content',
      what: 'Tools listed among my skills for writing, design, and digital support.',
      children: [
        {
          id: 'chatgpt',
          Icon: Sparkle,
          logos: [CHATGPT],
          name: 'ChatGPT',
          what: 'AI assistant for productivity tasks.',
        },
        {
          id: 'gemini',
          Icon: Sparkle,
          name: 'Gemini',
          what: 'AI assistant for productivity tasks.',
        },
        {
          id: 'canva',
          Icon: Browser,
          name: 'Canva',
          what: 'Design and visual content tool.',
        },
        {
          id: 'capcut',
          Icon: Browser,
          name: 'CapCut',
          what: 'Video editing tool.',
        },
        {
          id: 'meta-business-suite',
          Icon: UsersThree,
          name: 'Meta Business Suite',
          what: 'Social media management platform.',
        },
      ],
    },
  ],
}
