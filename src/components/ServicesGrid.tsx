import type { CSSProperties } from 'react'
import { MagnetStraight, Timer, Trophy, CheckCircle } from '@/components/slab'
import type { Icon } from '@/components/slab'
import Autopilot, { TOOLS } from '@/components/Autopilot'

/**
 * ServicesGrid - the Services view on one glass sheet.
 *
 * Three bands, top to bottom: your three-step method (on a dark plate so it
 * is the first thing the eye lands on), the five services as cards that carry
 * the marks of what each one is built with, and the live automation demo
 * scaled into whatever height is left. Same object language as Home and
 * Projects: the glass, the bento card, plated marks, orange for the index
 * and the accent.
 *
 * Every string below is a PLACEHOLDER. Replace it, or hand this file to your
 * AI assistant and tell it what to put in each spot.
 */

/* ---------- The method ---------- */

type Stage = {
  index: string
  label: string
  body: string
  Icon: Icon
  chips: string[]
}

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'Understand',
    body: 'Clarify priorities, communication channels, and next steps.',
    Icon: MagnetStraight,
    chips: ['Email', 'Tasks', 'Priorities'],
  },
  {
    index: '02',
    label: 'Organize',
    body: 'Keep schedules, records, and requests clear and up to date.',
    Icon: Timer,
    chips: ['Calendar', 'Data', 'Documents'],
  },
  {
    index: '03',
    label: 'Support',
    body: 'Respond carefully and help daily work stay on track.',
    Icon: Trophy,
    chips: ['Customer care', 'Follow-up', 'Details'],
  },
]

/* ---------- The services ---------- */

// Example tool marks from /public/icons. Swap for the tools you actually use.
const GOOGLE_WORKSPACE = '/icons/googleworkspace.svg'
const ZENDESK = '/icons/zendesk.svg'
const CHATGPT = '/icons/openai.svg'

type Service = {
  index: string
  title: string
  description: string
  chip: string
  logos: string[]
  bullets: string[]
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Administrative Support',
    description: 'Practical help with recurring tasks and day-to-day coordination.',
    chip: 'Operations',
    logos: [GOOGLE_WORKSPACE],
    bullets: ['Inbox and email correspondence', 'Calendar and schedule support', 'Organized task follow-through'],
  },
  {
    index: '02',
    title: 'Customer & Email Support',
    description: 'Clear, considerate responses through non-voice support channels.',
    chip: 'Customer care',
    logos: [ZENDESK, GOOGLE_WORKSPACE],
    bullets: ['Email and chat inquiries', 'Account requests and case updates', 'Policy-aware communication'],
  },
  {
    index: '03',
    title: 'Data Entry & Documentation',
    description: 'Careful data handling and clear, well-organized records.',
    chip: 'Documentation',
    logos: [GOOGLE_WORKSPACE],
    bullets: ['Accurate data entry', 'Document formatting and organization', 'Detail-focused record updates'],
  },
  {
    index: '04',
    title: 'Calendar & Schedule Management',
    description: 'Support for appointments, schedules, and meeting coordination.',
    chip: 'Scheduling',
    logos: [GOOGLE_WORKSPACE],
    bullets: ['Calendar updates and reminders', 'Meeting coordination', 'Flexible time-zone collaboration'],
  },
  {
    index: '05',
    title: 'Workspace & AI-Assisted Productivity',
    description: 'Everyday productivity support using familiar digital and AI tools.',
    chip: 'Digital support',
    logos: [GOOGLE_WORKSPACE, CHATGPT],
    bullets: ['Google Workspace and Microsoft Office', 'Notion, Canva, and digital platforms', 'ChatGPT and Gemini'],
  },
]

/** The tool marks, stacked horizontally on white tiles (same as Projects). */
function Marks({ logos }: { logos: string[] }) {
  return (
    <span className="bento__logos" aria-hidden="true">
      {logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- The page ---------- */

export default function ServicesGrid() {
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">
          Remote support for everyday operations.
        </h1>
        <p className="pgrid__lede">
          Administrative, customer support, and digital assistance grounded in careful communication and follow-through.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        {/* One dark plate, the headline on the left, the three stages wired
            in order on the right with a signal running them. */}
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">How I Work</span>
            <h2 className="sgrid__method-title" id="method-title">
              Understand. Organize. Support.
              <br />
              <span>Thoughtful help, from start to finish.</span>
            </h2>
            <p className="sgrid__method-sub">
              I clarify the request, keep the details organized, and communicate progress clearly.
            </p>
          </div>

          <ol className="sgrid__stages" role="list">
            {STAGES.map((s, i) => {
              const StageIcon = s.Icon
              return (
                <li key={s.index} className="sgrid__stage" style={{ '--i': i } as CSSProperties}>
                  <span className="sgrid__stage-ghost" aria-hidden="true">{s.index}</span>
                  <span className="sgrid__stage-icon" aria-hidden="true">
                    <StageIcon size={22} weight="duotone" />
                  </span>
                  <h3 className="sgrid__stage-label">{s.label}.</h3>
                  <p className="sgrid__stage-body">{s.body}</p>
                  <ul className="sgrid__stage-chips" role="list" aria-label={`${s.label} touches`}>
                    {s.chips.map((c) => (
                      <li key={c} className="sgrid__stage-chip">{c}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Five cards, each carrying the marks of what it is built with. */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">Your services, listed.</h2>
            <p className="sgrid__offers-sub">Support shaped around your day-to-day needs.</p>
          </div>
          <ul className="bento sgrid__services" role="list">
            {SERVICES.map((s) => (
              <li key={s.title} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-top">
                    <Marks logos={s.logos} />
                    <span className="sgrid__service-index" aria-hidden="true">{s.index} / 05</span>
                  </span>
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__desc">{s.description}</span>
                </span>
                <span className="sgrid__chip" aria-hidden="true">{s.chip}</span>
                <ul className="sgrid__bullets" role="list">
                  {s.bullets.map((b) => (
                    <li key={b} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* The live workflow. Its caption and the tool chips sit in a header
            above the window, so the canvas gets the whole glass width. */}
        <div className="sgrid__flow">
          <header className="sgrid__flow-head">
            <div className="sgrid__flow-copy">
              <span className="sgrid__flow-eyebrow">Illustrative workflow preview</span>
              <h2 className="sgrid__flow-title">A sample digital workflow.</h2>
              <p className="sgrid__flow-sub">
                This animated example is a template preview, not a client project.
              </p>
            </div>
            <ul className="sgrid__flow-tools" role="list" aria-label="Tools that power this flow">
              {TOOLS.map(({ Icon: ToolIcon, label }) => (
                <li key={label} className="sgrid__flow-tool">
                  <ToolIcon size={14} weight="duotone" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </header>
          <div className="sgrid__flow-main">
            <Autopilot compact maxScale={1.08} />
          </div>
        </div>
      </div>
    </section>
  )
}
