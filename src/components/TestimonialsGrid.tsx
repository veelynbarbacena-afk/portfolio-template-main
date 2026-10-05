import { useState } from 'react'
import {
  Play,
  Quotes,
  CheckCircle,
  ListChecks,
  EnvelopeSimple,
  CalendarBlank,
  Headset,
  Laptop,
  NotePencil,
  Sparkle,
} from '@/components/slab'

/**
 * TestimonialsGrid - the Testimonials view as a fixed viewport.
 *
 * Two columns inside one glass sheet: the video proof on the left, the client
 * ledger on the right. The page is sized to the panel and does not scroll, so
 * both clips share ONE stage and a picker switches between them rather than
 * stacking two players down a column that would never fit.
 *
 * Clips can disagree about orientation, so the stage is ONE fixed plate that
 * each is contained inside. Letting the frame take each clip's own ratio made
 * it jump size on every switch; a single plate keeps the card the same object
 * whichever is playing.
 *
 * To add a video: drop the .mp4 in public/testimonials/, set its `src` below
 * (e.g. '/testimonials/client-1.mp4'), and swap the poster for a still from
 * the clip. With `src` empty the cover stays up and play is disabled.
 */

type Clip = {
  id: string
  index: string
  /** Leave empty until you have the video file. */
  src: string
  poster: string
  duration: string
  kicker: string
  width: number
  height: number
}

const CLIPS: Clip[] = [
  {
    id: 'support-approach',
    index: '01',
    src: '',
    poster: '',
    duration: 'Reliable and organized',
    kicker: 'My approach',
    width: 720,
    height: 1080,
  },
  {
    id: 'learning-approach',
    index: '02',
    src: '',
    poster: '',
    duration: 'Willing to learn',
    kicker: 'Work style',
    width: 720,
    height: 1080,
  },
]

const STRENGTHS = [
  {
    title: 'Reliable and organized',
    detail: 'A structured, dependable approach to assigned responsibilities.',
    points: ['Customer-focused'],
  },
  {
    title: 'Adaptable with digital tools',
    detail: 'Comfortable working across office, communication, and AI tools.',
    points: ['Detail-oriented'],
  },
  {
    title: 'Willing to learn',
    detail: 'Ready to learn new tools, workflows, and team processes.',
    points: [],
  },
]

const APPROACH_STEPS = [
  { label: 'Messages', Icon: EnvelopeSimple },
  { label: 'Calendar', Icon: CalendarBlank },
  { label: 'Task list', Icon: ListChecks },
  { label: 'Follow through', Icon: CheckCircle },
]

const WORK_TOOLS = [
  { label: 'Customer support', Icon: Headset },
  { label: 'Notes', Icon: NotePencil },
  { label: 'Calendar', Icon: CalendarBlank },
  { label: 'Digital tools', Icon: Sparkle },
]

function ApproachIllustration() {
  return (
    <div className="tgrid__illustration tgrid__illustration--approach" aria-hidden="true">
      <div className="tgrid__illustration-head">
        <span className="tgrid__illustration-mark"><ListChecks size={19} weight="duotone" /></span>
        <span className="tgrid__illustration-title">Organized workflow</span>
      </div>
      <div className="tgrid__workflow">
        {APPROACH_STEPS.map(({ label, Icon }, i) => (
          <div className="tgrid__workflow-step" key={label}>
            <span className="tgrid__workflow-index">0{i + 1}</span>
            <span className="tgrid__workflow-icon"><Icon size={18} weight="duotone" /></span>
            <span className="tgrid__workflow-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function WorkStyleIllustration() {
  return (
    <div className="tgrid__illustration tgrid__illustration--workstyle" aria-hidden="true">
      <div className="tgrid__workstation">
        <div className="tgrid__laptop">
          <span className="tgrid__laptop-screen">
            <Laptop size={46} weight="duotone" />
          </span>
          <span className="tgrid__laptop-base" />
        </div>
        <div className="tgrid__work-tools">
          {WORK_TOOLS.map(({ label, Icon }) => (
            <span className="tgrid__work-tool" key={label}>
              <Icon size={16} weight="duotone" />
              <span>{label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsGrid() {
  const [active, setActive] = useState(0)
  // The stage shows the clip's poster as cover art until it is asked to
  // play. A poster can fill the frame edge to edge whichever way the clip is
  // shot; a paused <video> cannot, and letterboxing one orientation into a
  // fixed frame left a third of the plate as dead margin.
  const [playing, setPlaying] = useState(false)
  const clip = CLIPS[active]
  const hasVideo = clip.src !== ''
  const pick = (i: number) => {
    setActive(i)
    setPlaying(false)
  }

  return (
    <section className="pgrid tgrid" aria-labelledby="testimonials-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Remote Administrative Support</span>
        <h1 className="pgrid__title" id="testimonials-title">
          Why Work With Me
        </h1>
        <p className="pgrid__lede">
          I bring a reliable, customer-focused approach as I transition from BPO support into remote administrative work.
        </p>
      </header>

      <div className="home__glass tgrid__glass">
        {/* Left: a concise introduction in the existing feature stage. */}
        <div className="tgrid__reel">
          <div className="tgrid__stage">
            {playing && hasVideo ? (
              // Re-keyed so switching clips mounts a fresh element instead of
              // swapping src on a player that is already mid-playback.
              <video
                key={clip.id}
                className="tgrid__video"
                src={clip.src}
                poster={clip.poster}
                width={clip.width}
                height={clip.height}
                controls
                autoPlay
                playsInline
                aria-label={`Video testimonial ${clip.index} from a client`}
              />
            ) : (
              clip.poster ? (
                <button
                  type="button"
                  className="tgrid__cover"
                  onClick={() => hasVideo && setPlaying(true)}
                  disabled={!hasVideo}
                  aria-label={`Play client testimonial ${clip.index}, ${clip.duration}`}
                >
                  <img
                    key={clip.id}
                    className="tgrid__cover-img"
                    src={clip.poster}
                    alt=""
                    decoding="async"
                  />
                  <span className="tgrid__cover-shade" aria-hidden="true" />
                  {hasVideo && (
                    <span className="tgrid__cover-play" aria-hidden="true">
                      <Play size={26} weight="fill" />
                    </span>
                  )}
                  <span className="tgrid__cover-meta" aria-hidden="true">
                    <span className="tgrid__cover-kicker">{clip.kicker} {clip.index}</span>
                    <span className="tgrid__cover-sub">{clip.duration} · Tap to play</span>
                  </span>
                </button>
              ) : (
                <div className="tgrid__cover tgrid__cover--illustration" role="img" aria-label={`${clip.kicker}: ${clip.duration}`}>
                  {active === 0 ? <ApproachIllustration /> : <WorkStyleIllustration />}
                  <span className="tgrid__cover-meta" aria-hidden="true">
                    <span className="tgrid__cover-kicker">{clip.kicker}</span>
                    <span className="tgrid__cover-sub">{clip.duration}</span>
                  </span>
                </div>
                )
              )}
          </div>

          {/* The picker is one segmented control, not two loose chips: two
              cells on a shared plate, the active one lit. */}
          <div className="tgrid__picker" role="group" aria-label="Work style">
            {CLIPS.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`tgrid__pick${i === active ? ' is-active' : ''}`}
                onClick={() => pick(i)}
                aria-pressed={i === active}
              >
                <span className="tgrid__pick-thumb" aria-hidden="true">
                  {c.poster ? (
                    <img src={c.poster} alt="" loading="lazy" decoding="async" />
                  ) : (
                    <Quotes size={14} weight="duotone" />
                  )}
                </span>
                <span className="tgrid__pick-copy">
                  <span className="tgrid__pick-kicker">{c.kicker}</span>
                  <span className="tgrid__pick-meta">{c.duration}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: the qualities I bring to remote support work. */}
        <div className="tgrid__ledger">
          <div className="tgrid__ledger-head">
            <h2 className="tgrid__ledger-title">What I Bring</h2>
            <p className="tgrid__ledger-sub">Professional habits for remote administrative support.</p>
          </div>

          {/* One plate, three rows split by hairlines. Three boxed cards each
              carrying their own border read as three separate widgets; a
              single ledger reads as one record. */}
          <ul className="tgrid__clients" role="list">
            {STRENGTHS.map((strength, i) => (
              <li key={strength.title} className="tgrid__client">
                <span className="tgrid__client-ghost" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="tgrid__client-mark" aria-hidden="true">
                  <CheckCircle size={22} weight="duotone" />
                </span>
                <span className="tgrid__client-body">
                  <span className="tgrid__client-name">{strength.title}</span>
                  <span className="tgrid__client-daily">{strength.detail}</span>
                  {strength.points.length > 0 && (
                    <ul className="tgrid__client-tags" role="list">
                      {strength.points.map((point) => (
                        <li key={point} className="tgrid__client-tag">{point}</li>
                      ))}
                    </ul>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
