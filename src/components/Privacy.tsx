import { ArrowLeft } from '@/components/slab'
import { useNavigate } from 'react-router-dom'
import { profile } from '@/data/profile'

/**
 * Privacy Policy - PLACEHOLDER. Legal text has to describe YOUR site and what
 * it collects, so none is supplied. Write it (or have a lawyer or a policy
 * generator write it) and paste it into the sections below.
 */
export default function Privacy() {
  const navigate = useNavigate()

  return (
    <main className="legal-page" aria-label="Privacy Policy">
      <div className="legal-page__card">
        <button
          className="legal-page__back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <ArrowLeft weight="bold" size={15} aria-hidden="true" />
          Back to home
        </button>

        <h1 className="legal-page__title">Privacy Policy</h1>
        <p className="legal-page__updated">Privacy details to be completed before publication.</p>

        <div className="legal-page__body">
          <h2>Who this covers</h2>
          <p>Site ownership and the domains covered by this policy will be confirmed before publication.</p>

          <h2>What is collected</h2>
          <p>Details about information collected through forms or analytics will be added before publication.</p>

          <h2>How it is used</h2>
          <p>Details about how information is used or shared will be added before publication.</p>

          <h2>How long it is kept</h2>
          <p>Retention and data-request information will be added before publication.</p>

          <h2>Contact</h2>
          <p>
            Questions about this policy: <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </div>
      </div>
    </main>
  )
}
