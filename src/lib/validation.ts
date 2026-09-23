import { z } from 'zod'

// A visitor typing on an Arabic or Persian keyboard layout may enter their
// phone number in Arabic-Indic (٠-٩) or Extended Arabic-Indic/Persian
// (۰-۹) digits rather than ASCII — normalize before length/format checks so
// a real, validly-formatted number isn't rejected just because of the
// digit script used to type it.
function normalizeDigits(value: string): string {
  return value
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - '٠'.charCodeAt(0)))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - '۰'.charCodeAt(0)))
}

export const consultationSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    phone: z.preprocess(
      (value) => (typeof value === 'string' ? normalizeDigits(value.trim()) : value),
      z.string().min(7).max(30),
    ),
    email: z.string().trim().email().max(200).optional().or(z.literal('')),
    clientType: z.enum(['individual', 'company']),
    // Accepts null too: a <select> whose only selected option is disabled
    // (our unset placeholder) submits FormData as null, not '' — see
    // ConsultationForm.tsx.
    legalArea: z.string().trim().max(200).optional().or(z.literal('')).nullable(),
    preferredContact: z.enum(['phone', 'whatsapp', 'email']),
    message: z.string().trim().max(2000).optional().or(z.literal('')),
    urgency: z.enum(['urgent', 'normal']),
    consent: z.literal(true, {
      errorMap: () => ({ message: 'Consent is required.' }),
    }),
    sourcePage: z.string().trim().max(300).optional().or(z.literal('')),
    locale: z.enum(['ar', 'en']),
    // Honeypot — must stay empty. Any value here signals a bot.
    companyWebsite: z.string().max(0).optional().or(z.literal('')),
  })
  // If the visitor asked to be contacted by email, an empty email field
  // means we have no way to actually reach them — reject at submission
  // time instead of silently saving an unreachable lead.
  .refine((data) => data.preferredContact !== 'email' || (typeof data.email === 'string' && data.email.trim().length > 0), {
    message: 'Email is required when email is the preferred contact method.',
    path: ['email'],
  })

export type ConsultationInput = z.infer<typeof consultationSchema>
