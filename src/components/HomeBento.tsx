import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Robot,
  Medal,
  Stack,
  Quotes,
  FunnelSimple,
  Gear,
  AddressBook,
  Globe,
  AppWindow,
  SealCheck,
} from '@/components/slab'
import { aiStack, type StackNode } from '@/data/ai-stack'
import { profile } from '@/data/profile'

/**
 * Home's showcase: one card per rail view, each an index of what that view
 * holds, each built from content the portfolio already ships. Every card is
 * a link and its preview avoids implying unprovided client work.
 *
 * Motion is transform-only on a clipped inner track, so a card never adds
 * height and Home stays a single viewport.
 */

const CAREER_STAGES = [
  { key: 'education', number: '01', label: 'Civil Engineering', symbol: 'education' },
  { key: 'support', number: '02', label: 'Customer Support', symbol: 'support' },
  { key: 'recognition', number: '03', label: 'Top Agent · Q2 2025', symbol: 'recognition' },
  { key: 'skills', number: '04', label: 'Admin & Digital Skills', symbol: 'skills' },
]

const OFFERS = [
  { Icon: FunnelSimple, title: 'Administrative Support', note: 'Organized day-to-day assistance' },
  { Icon: Gear, title: 'Customer Support', note: 'Email and non-voice inquiries' },
  { Icon: AddressBook, title: 'Data & Documentation', note: 'Accurate records and entry' },
  { Icon: Globe, title: 'Calendar Management', note: 'Scheduling and coordination' },
  { Icon: AppWindow, title: 'Digital Productivity', note: 'Workspace and AI tools' },
] as const

// Three photos of you, fanned. Small copies are fine - the fan shows them under 100px.
const PHOTOS = [profile.avatarSrc, profile.avatarSrc, profile.avatarSrc]

function CareerSnapshotPreview() {
  return (
    <div className="bento__media bento__reel bento__career-reel" aria-hidden="true">
      <div className="bento__reel-track">
        {[...CAREER_STAGES, ...CAREER_STAGES].map((stage, i) => (
          <span className="bento__career-step" key={`${stage.key}-${i}`}>
            <span className="bento__career-num">{stage.number}</span>
            <span className={`bento__career-symbol bento__career-symbol--${stage.symbol}`}>
              <i /><i /><i /><i />
            </span>
            <span className="bento__career-label">{stage.label}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/** The AI systems as a flat list: every leaf of the Projects tree, in order. */
const leaves = (n: StackNode): StackNode[] =>
  n.children?.length ? n.children.flatMap(leaves) : [n]
const AI_BUILDS = leaves(aiStack)

function CardHead({
  Icon,
  title,
  desc,
}: {
  Icon: typeof FolderOpen
  title: string
  desc: string
}) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="bento__title">{title}</h3>
      </span>
      <p className="bento__desc">{desc}</p>
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}

export default function HomeBento() {
  const half = Math.ceil(AI_BUILDS.length / 2)
  const toolRows = [AI_BUILDS.slice(0, half), AI_BUILDS.slice(half)]

  return (
    <nav className="bento" aria-label="Explore the portfolio">
      {/* Career snapshot: the existing reel remains the card's moving visual. */}
      <Link to="/projects" className="bento__card bento__card--projects">
        <CardHead Icon={FolderOpen} title="Career Snapshot" desc="Education, customer support experience, recognition, and skills." />
        <CareerSnapshotPreview />
      </Link>

      {/* About: a fanned stack of photos. */}
      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="About" desc="Civil Engineering graduate and remote support professional." />
        <div className="bento__media bento__fan" aria-hidden="true">
          {PHOTOS.map((src, i) => (
            <span key={i} className="bento__photo" style={{ ['--i' as string]: i }}>
              <img src={src} alt="" loading="lazy" decoding="async" />
            </span>
          ))}
        </div>
      </Link>

      {/* Digital tools: the systems from the Projects tree, two chip rows
          scrolling against each other. */}
      <Link to="/projects" className="bento__card bento__card--ai">
        <CardHead Icon={Robot} title="Digital Tools" desc="Tools for support and everyday productivity." />
        <div className="bento__media bento__chips" aria-hidden="true">
          {toolRows.map((row, r) => (
            <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
              <div className="bento__chip-track">
                {[...row, ...row].map((n, i) => (
                  <span key={`${n.id}-${i}`} className="bento__chip" data-status={n.status}>
                    <n.Icon size={15} weight="duotone" />
                    {n.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Link>

      {/* Credentials: the badge that matters, on its plate. */}
      <Link to="/about" className="bento__card bento__card--creds">
        <CardHead Icon={Medal} title="Recognition" desc="Top Agent Performer, Concentrix - Q2 2025." />
        <div className="bento__media bento__badge" aria-hidden="true">
          <span className="bento__badge-ring">
            <SealCheck size={40} weight="fill" />
          </span>
          <span className="bento__badge-tag">
            <SealCheck size={14} weight="fill" />
            July 2025
          </span>
        </div>
      </Link>

      {/* Services: the five offers as a compact index. */}
      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={Stack} title="Services" desc="Administrative, customer, and digital support." />
        <ul className="bento__media bento__offers" role="list">
          {OFFERS.map(({ Icon, title, note }, i) => (
            <li key={title} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-tile">
                <Icon size={15} weight="duotone" aria-hidden="true" />
              </span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{title}</span>
                <span className="bento__offer-note">{note}</span>
              </span>
              <span className="bento__offer-num" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </Link>

      {/* Work style: a brief summary in the existing animated card. */}
      <Link to="/testimonials" className="bento__card bento__card--quotes">
        <CardHead Icon={Quotes} title="Why Work With Me" desc="Reliable, organized, customer-focused support." />
        <div className="bento__media bento__reviews" aria-hidden="true">
          <span className="bento__review">
            <span className="bento__review-top"><Quotes size={14} weight="fill" /><b>My approach</b></span>
            <span className="bento__review-role">Adaptable, detail-oriented, willing to learn</span>
          </span>
        </div>
      </Link>
    </nav>
  )
}
