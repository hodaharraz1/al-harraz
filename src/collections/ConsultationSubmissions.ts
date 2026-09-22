import type { CollectionConfig } from 'payload'
import { isStaff } from '@/access/isStaff'

export const ConsultationSubmissions: CollectionConfig = {
  slug: 'consultation-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'legalArea', 'status', 'submittedAt'],
    description: 'Private — written only by the server-side form handler (Local API), never via public REST/GraphQL. Staff-read only.',
  },
  access: {
    // Public create is intentionally disabled here: submissions are written
    // via the Local API from src/app/(frontend)/[locale]/consultation/actions
    // AFTER server-side validation, honeypot and rate-limit checks, with
    // overrideAccess so this collection's REST/GraphQL API stays closed to
    // direct public writes (see SECURITY.md §Spam Protection).
    create: () => false,
    read: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email' },
    {
      name: 'clientType',
      type: 'select',
      options: [
        { label: 'Individual', value: 'individual' },
        { label: 'Company', value: 'company' },
      ],
    },
    { name: 'legalArea', type: 'text' },
    {
      name: 'preferredContact',
      type: 'select',
      options: [
        { label: 'Phone', value: 'phone' },
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'Email', value: 'email' },
      ],
    },
    { name: 'message', type: 'textarea' },
    {
      name: 'urgency',
      type: 'select',
      options: [
        { label: 'Urgent', value: 'urgent' },
        { label: 'Normal', value: 'normal' },
      ],
    },
    { name: 'consent', type: 'checkbox', required: true },
    { name: 'sourcePage', type: 'text' },
    { name: 'submittedAt', type: 'date', defaultValue: () => new Date().toISOString() },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
    },
  ],
}
