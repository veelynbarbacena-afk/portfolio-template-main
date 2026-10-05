import { ArrowLeft } from '@/components/slab'
import { useNavigate } from 'react-router-dom'
import { profile } from '@/data/profile'

/**
 * Terms of Service - PLACEHOLDER. Legal text has to fit YOUR business, so
 * none is supplied. Paste your own terms into the sections below.
 */
export default function ToS() {
  const navigate = useNavigate()

  return (
    <main className="legal-page" aria-label="Terms of Service">
      <div className="legal-page__card">
        <button
          className="legal-page__back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <ArrowLeft weight="bold" size={15} aria-hidden="true" />
          Back to home
        </button>

        <h1 className="legal-page__title">Terms of Service</h1>
        <p className="legal-page__updated">Terms to be completed before publication.</p>

        <div className="legal-page__body">
          <h2>Using this site</h2>
          <p>Site use terms will be added before publication.</p>

          <h2>Work and payment</h2>
          <p>Service, payment, and delivery terms will be agreed before any work begins.</p>

          <h2>Ownership</h2>
          <p>Ownership terms will be documented before publication and before any work begins.</p>

          <h2>Liability</h2>
          <p>Liability terms will be added before publication.</p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </div>
      </div>
    </main>
  )
}
