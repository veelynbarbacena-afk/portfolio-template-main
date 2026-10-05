import type { CSSProperties } from 'react'
import { MapPin, SealCheck, GraduationCap, FileText, type Icon } from '@/components/slab'
import { profile } from '@/data/profile'

/**
 * AboutGrid - the About view as a fixed viewport.
 *
 * One glass sheet, two columns: who you are on the left, the illustration
 * on the right. Sized to the panel, so nothing here scrolls.
 *
 * The left column is a ladder, not a paragraph block: one display statement,
 * one line of context, then the four things you do - each carrying the marks
 * of the tools it is built with. The tools are the proof, so they are the
 * visual. Swap the marks below for your own (any square SVG/PNG in public/).
 */

const GOOGLE_WORKSPACE = { src: '/icons/googleworkspace.svg', name: 'Google Workspace' }
const ZENDESK = { src: '/icons/zendesk.svg', name: 'Zendesk' }
const CHATGPT = { src: '/icons/openai.svg', name: 'ChatGPT' }

type Capability = {
  index: string
  title: string
  marks: { src: string; name: string }[]
  icon?: Icon
}

const CAPABILITIES: Capability[] = [
  {
    index: '01',
    title: 'Administrative Support',
    marks: [GOOGLE_WORKSPACE],
  },
  {
    index: '02',
    title: 'Customer & Email Support',
    marks: [ZENDESK],
  },
  {
    index: '03',
    title: 'AI-Assisted Productivity',
    marks: [CHATGPT],
  },
  {
    index: '04',
    title: 'Content & Digital Support',
    marks: [],
    icon: FileText,
  },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          Civil Engineering graduate transitioning into remote administrative, virtual assistant, and customer support work.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            An engineering mindset for the details.
            <span> Organized, thoughtful support for everyday work.</span>
          </p>

          <p className="agrid__note">
            I worked as an Advisor at <strong>Concentrix Cyberwest</strong>, handling high-volume email and chat inquiries, account requests, and case resolution. I hold a B.S. in Civil Engineering from Eulogio Amang Rodriguez Institute of Science and Technology and completed STEM at Meycauayan National High School. English (Proficient); Filipino (Native / Bilingual).
          </p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className={`agrid__cap${c.icon ? ' agrid__cap--content' : ''}`}>
                <span className="agrid__cap-marks">
                  {c.icon && (
                    <span className="agrid__mark" style={{ '--i': 1 } as CSSProperties}>
                      <c.icon size={20} weight="duotone" aria-hidden="true" />
                    </span>
                  )}
                  {c.marks.map((m, i) => (
                    <span
                      key={m.name}
                      className="agrid__mark"
                      style={{ '--i': c.marks.length - i } as CSSProperties}
                    >
                      <img src={m.src} alt={m.name} loading="lazy" decoding="async" />
                    </span>
                  ))}
                </span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          {/* One plate, two cells sharing a mark / title / meta anatomy. */}
          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <SealCheck size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Top Agent Performer</span>
                <span className="agrid__cell-meta">Concentrix · July 2025</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">Flexible US, UK & Australian hours</span>
              </span>
            </span>

            <span className="agrid__cell agrid__cell--wide">
              <span className="agrid__cell-mark">
                <GraduationCap size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Additional Training</span>
                <span className="agrid__cell-meta">Virtual Assistant Masterclass, Top Tier (July 2024) · Coursera: Prepare Data for Exploration (February 2024)</span>
              </span>
            </span>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src={profile.hero.portraitSrc}
            alt={profile.hero.portraitAlt}
            loading="eager"
            decoding="async"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  )
}
