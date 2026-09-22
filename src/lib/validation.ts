import { z } from 'zod'

export const consultationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(200).optional().or(z.literal('')),
  clientType: z.enum(['individual', 'company']),
  legalArea: z.string().trim().max(200).optional().or(z.literal('')),
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

export type ConsultationInput = z.infer<typeof consultationSchema>
