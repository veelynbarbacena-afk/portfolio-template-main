import { Fragment, useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X, CursorClick } from '@/components/slab'
import { FlowIcon, PlanIcon, GlobeIcon, SparkIcon } from './ProjectIcons'
import { useIsPhone } from '@/hooks/useMediaQuery'

/**
 * Projects, as one viewport in Home's bento language: a glass panel of six
 * cards, each previewing its own body of work with a live inner track, each
 * opening the work itself in a near-fullscreen dialog (see ProjectPanels for
 * the first three; the rest are the sections the long page used to stack).
 *
 * The dialog is a portal at z 8000, under the funnel preview (9000) so the
 * barrel's own "open this page" dialog can still stack on top of it.
 */
type Project = {
  id: string
  index: string
  title: string
  desc: string
  Icon: ComponentType<{ size?: number }>
  eyebrow: string
  Section: ComponentType
  span?: 2
  /** Open Builds style: a small orange kicker above the title. */
  kicker?: string
  /** Real marks of what the work was built in; replaces the icon tile. */
  logos?: string[]
  Preview: ComponentType
  /** Phone filter bucket. */
  cat: Cat
}

type Cat = 'education' | 'experience' | 'recognition' | 'skills'
const FILTERS: { key: Cat | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'education', label: 'Education' },
  { key: 'experience', label: 'Experience' },
  { key: 'recognition', label: 'Recognition' },
  { key: 'skills', label: 'Skills' },
]

const BUILDS: Project[] = []

/* ---------- Previews ---------- */

type SnapshotKind = 'education' | 'experience' | 'recognition' | 'skills'

function SnapshotPreview({ kind }: { kind: SnapshotKind }) {
  return (
    <div className={`bento__media career-art career-art--${kind}`} aria-hidden="true">
      {kind === 'education' && (
        <div className="career-art__blueprint">
          <span className="career-art__blueprint-ring" />
          <div className="career-art__building">
            <span className="career-art__roof" />
            <span className="career-art__floor career-art__floor--top"><i /><i /><i /></span>
            <span className="career-art__floor career-art__floor--bottom"><i /><i /><i /></span>
            <span className="career-art__foundation" />
          </div>
          <span className="career-art__ruler"><i /><i /><i /><i /><i /></span>
          <span className="career-art__dimension" />
        </div>
      )}
      {kind === 'experience' && (
        <div className="career-art__support">
          <div className="career-art__support-head"><i /><i /><i /><span /></div>
          <div className="career-art__conversation">
            <span className="career-art__bubble career-art__bubble--incoming"><i /><i /></span>
            <span className="career-art__bubble career-art__bubble--reply"><i /><i /><i /></span>
            <span className="career-art__message"><i /><i /><i /></span>
          </div>
          <span className="career-art__mail"><i /><i /></span>
        </div>
      )}
      {kind === 'recognition' && (
        <div className="career-art__award">
          <span className="career-art__confetti career-art__confetti--one" />
          <span className="career-art__confetti career-art__confetti--two" />
          <span className="career-art__ribbon" />
          <span className="career-art__medal"><span className="career-art__star" /></span>
          <span className="career-art__award-year">Q2 2025</span>
        </div>
      )}
      {kind === 'skills' && (
        <div className="career-art__workspace">
          <div className="career-art__window-bar"><i /><i /><i /><span /></div>
          <div className="career-art__workspace-grid">
            <span className="career-art__calendar"><i /><i /><i /><i /><i /><i /></span>
            <span className="career-art__document"><i /><i /><i /><i /></span>
            <span className="career-art__checklist"><i /><i /><i /></span>
            <span className="career-art__inbox"><i /><i /></span>
          </div>
        </div>
      )}
    </div>
  )
}

const EducationPreview = () => <SnapshotPreview kind="education" />
const ExperiencePreview = () => <SnapshotPreview kind="experience" />
const RecognitionPreview = () => <SnapshotPreview kind="recognition" />
const SkillsPreview = () => <SnapshotPreview kind="skills" />

function SnapshotPanel({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="ppanel ppanel--window">
      <div className="ppanel__scroll">
        <header className="projects__header">
          <span className="projects__eyebrow">Career Snapshot</span>
          <h2 className="projects__headline">{title}</h2>
          <p className="projects__subhead">{detail}</p>
        </header>
      </div>
    </div>
  )
}

const EducationPanel = () => <SnapshotPanel title="Civil Engineering Graduate" detail="Bachelor of Science in Civil Engineering, Eulogio Amang Rodriguez Institute of Science and Technology." />
const ExperiencePanel = () => <SnapshotPanel title="BPO / Customer Support Experience" detail="Advisor at Concentrix Cyberwest, handling customer inquiries and account concerns through non-voice support." />
const RecognitionPanel = () => <SnapshotPanel title="Top Agent Performer - Concentrix, Q2 2025" detail="Recognition received in July 2025." />
const SkillsPanel = () => <SnapshotPanel title="Administrative & Digital Productivity Skills" detail="Calendar and email support, data entry, documentation, Google Workspace, Microsoft Office, and AI-assisted productivity tools." />

const PROJECTS: Project[] = [
  { id: 'education', cat: 'education', index: '01', title: 'Civil Engineering Graduate', desc: 'Bachelor of Science in Civil Engineering.', Icon: PlanIcon, eyebrow: 'Education', Section: EducationPanel, Preview: EducationPreview },
  { id: 'experience', cat: 'experience', index: '02', title: 'BPO / Customer Support Experience', desc: 'Advisor experience in high-volume non-voice support.', Icon: FlowIcon, eyebrow: 'Experience', Section: ExperiencePanel, Preview: ExperiencePreview },
  { id: 'recognition', cat: 'recognition', index: '03', title: 'Top Agent Performer - Concentrix, Q2 2025', desc: 'Recognized for performance in July 2025.', Icon: GlobeIcon, eyebrow: 'Recognition', Section: RecognitionPanel, Preview: RecognitionPreview },
  { id: 'skills', cat: 'skills', index: '04', title: 'Administrative & Digital Productivity Skills', desc: 'Organized administrative support with familiar office and AI tools.', Icon: SparkIcon, eyebrow: 'Skills', Section: SkillsPanel, Preview: SkillsPreview },
]

/** The icon tile, or the real marks stacked horizontally in its place. */
function Marks({ p, size = 22 }: { p: Project; size?: number }) {
  if (!p.logos?.length) {
    return (
      <span className="bento__icon">
        <p.Icon size={size} />
      </span>
    )
  }
  return (
    <span className="bento__logos" aria-hidden="true">
      {p.logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- Dialog ----------
   A backdrop, a close button in the corner, and the work. No panel, no
   header: each Section brings its own window (or, for the strip, none). */
function ProjectModal({ project, onClose, children }: { project: Project; onClose: () => void; children: ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="pmodal"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button ref={closeRef} type="button" className="pmodal__close" onClick={onClose} aria-label="Close">
        <X size={18} weight="bold" />
      </button>
      <div className="pmodal__stage">{children}</div>
    </div>,
    document.body,
  )
}

/* ---------- The page ---------- */

export default function ProjectsGrid() {
  const [open, setOpen] = useState<Project | null>(null)
  const phone = useIsPhone()
  const [cat, setCat] = useState<Cat | 'all'>('all')
  const keep = (p: Project) => !phone || cat === 'all' || p.cat === cat
  const projects = PROJECTS.filter(keep)
  const builds = BUILDS.filter(keep)
  const triggerRef = useRef<HTMLElement | null>(null)

  const show = useCallback((p: Project, el: HTMLElement) => {
    triggerRef.current = el
    setOpen(p)
  }, [])
  const close = useCallback(() => {
    setOpen(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const stack = builds.length > 0 ? (
    <div className="bento__stack">

        {builds.map((b) => (

          <button

            key={b.id}

            type="button"

            className="bento__card bento__card--btn bento__card--build"

            onClick={(e) => show(b, e.currentTarget)}

            aria-haspopup="dialog"

          >

            <span className="bento__build-plate">

              {b.logos?.length ? <img src={b.logos[0]} alt="" width={22} height={22} /> : <b.Icon />}

            </span>

            <span className="bento__build-text">

              <span className="bento__kicker">{b.kicker}</span>

              <span className="bento__build-title">{b.title}</span>

              <span className="bento__build-desc">{b.desc}</span>

            </span>

            <span className="bento__build-arrow">

              <ArrowUpRight size={13} weight="bold" aria-hidden="true" />

            </span>

          </button>

        ))}

      </div>
  ) : null

  return (
    <section className="pgrid" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Career Snapshot</span>
        <h1 className="pgrid__title" id="projects-title">
          Career Snapshot
        </h1>
        <p className="pgrid__lede">A quick look at my education, customer support experience, recognition, and practical digital skills.</p>
      </header>

      {phone && (
        <div className="pfilter" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className="pfilter__btn"
              aria-pressed={cat === f.key}
              onClick={() => setCat(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="home__glass pgrid__glass">
        {/* Hung on the sheet's top edge so it reads as a tag on the container,
            not a seventh card. aria-hidden: the lede already says it. */}
        <span className="pgrid__hint" aria-hidden="true">
          <CursorClick size={14} weight="duotone" />
          Click a card to open it
        </span>
        <div className="bento bento--projects">
          {projects.map((p) => (
            <Fragment key={p.id}>
            <button
              type="button"
              className={`bento__card bento__card--btn${p.span === 2 ? ' bento__card--wide' : ''}`}
              data-id={p.id}
              onClick={(e) => show(p, e.currentTarget)}
              aria-haspopup="dialog"
            >
              <span className="bento__head">
                <Marks p={p} />
                <span className="bento__title">{p.title}</span>
                <span className="bento__desc">{p.desc}</span>
                <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
              </span>
              <p.Preview />
            </button>
            {p.id === 'plan' && stack}
            </Fragment>
          ))}
          {!projects.some((p) => p.id === 'plan') && stack}
        </div>
      </div>

      {open && (
        <ProjectModal project={open} onClose={close}>
          <open.Section />
        </ProjectModal>
      )}
    </section>
  )
}
