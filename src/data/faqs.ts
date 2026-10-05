export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Five questions, two or three sentences each: the accordion sits in a
 * fixed panel and more than that pushes the email row off the plate.
 */
export const FAQS: QA[] = [
  {
    q: 'What do you do?',
    a: 'I provide remote administrative support, email and non-voice customer support, data entry, documentation, and calendar assistance.',
  },
  {
    q: 'How fast can you start?',
    a: 'I am available for full-time remote work and can coordinate across US, UK, and Australian time zones.',
  },
  {
    q: 'Are you set up for remote work?',
    a: 'I have reliable internet, a backup Smart 5G hotspot and portable power station, a Ryzen 5 5600G desktop, noise-cancelling headset, HD webcam, and a quiet work environment.',
  },
  {
    q: 'Where are you based?',
    a: 'I am based in Meycauayan City, Bulacan, Philippines, and can work flexibly with US, UK, and Australian time zones.',
  },
  {
    q: 'What happens after I write?',
    a: 'I will review your message and follow up by email about the role or support you need.',
  },
]
