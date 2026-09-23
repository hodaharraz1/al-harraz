'use client'

import { useRef, useState, type FormEvent } from 'react'
import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'

const copy = {
  ar: {
    name: 'الاسم بالكامل',
    phone: 'رقم الهاتف',
    email: 'البريد الإلكتروني (اختياري)',
    clientType: 'نوع العميل',
    individual: 'فرد',
    company: 'شركة',
    legalArea: 'المجال القانوني',
    preferredContact: 'طريقة التواصل المفضلة',
    message: 'وصف مختصر للمسألة',
    urgency: 'درجة الاستعجال',
    urgent: 'عاجل',
    normal: 'عادي',
    consent: 'أوافق على أن يتواصل معي المكتب بخصوص استفساري، وأقر بأن إرسال هذا النموذج لا ينشئ علاقة محامٍ وموكل.',
    submit: 'إرسال الطلب',
    submitting: 'جارٍ الإرسال...',
    success: 'تم استلام طلبك بنجاح. سيتواصل معك فريقنا في أقرب وقت ممكن.',
    error: 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو التواصل عبر الهاتف.',
  },
  en: {
    name: 'Full Name',
    phone: 'Phone Number',
    email: 'Email (optional)',
    clientType: 'Client Type',
    individual: 'Individual',
    company: 'Company',
    legalArea: 'Legal Area',
    preferredContact: 'Preferred Contact Method',
    message: 'Short Description of Your Matter',
    urgency: 'Urgency',
    urgent: 'Urgent',
    normal: 'Normal',
    consent:
      'I consent to being contacted by the firm regarding my enquiry, and understand that submitting this form does not create an attorney-client relationship.',
    submit: 'Submit Request',
    submitting: 'Submitting...',
    success: 'Your request has been received. Our team will contact you as soon as possible.',
    error: 'Something went wrong while submitting. Please try again or contact us by phone.',
  },
} as const

const inputClass =
  'mt-1.5 block w-full rounded-2xl border-0 bg-neutral-100 px-4 py-3 text-sm text-navy-950 outline-none ring-1 ring-navy-900/10 transition-shadow focus:ring-2 focus:ring-cyan-600'

export function ConsultationForm({
  locale,
  sourcePage,
  practiceAreaOptions,
}: {
  locale: Locale
  sourcePage: string
  practiceAreaOptions: string[]
}) {
  const t = copy[locale]
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const hasTrackedStart = useRef(false)

  function handleFirstInteraction() {
    if (hasTrackedStart.current) return
    hasTrackedStart.current = true
    trackEvent('consultation_form_start', { locale })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      clientType: formData.get('clientType'),
      // A <select> whose only "selected" option is disabled (our unset
      // placeholder) submits as null, not '' — normalize it so an optional
      // field left untouched doesn't fail server-side validation and
      // silently drop the enquiry (see TESTING.md).
      legalArea: formData.get('legalArea') ?? '',
      preferredContact: formData.get('preferredContact'),
      message: formData.get('message'),
      urgency: formData.get('urgency'),
      consent: formData.get('consent') === 'on',
      sourcePage,
      locale,
      companyWebsite: formData.get('companyWebsite'),
    }

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      trackEvent('consultation_form_submit', { locale })
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="rounded-md bg-cyan-600/10 p-4 text-sm font-medium text-cyan-700">{t.success}</p>
  }

  return (
    <form onSubmit={handleSubmit} onFocusCapture={handleFirstInteraction} className="relative space-y-5">
      {/* Honeypot field — hidden from sighted users, left blank by bots.
          Clipped via a zero-size overflow-hidden wrapper (scoped to this
          relatively-positioned form) rather than a large negative offset,
          which previously escaped the form and caused page-wide horizontal
          overflow — see TESTING.md. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="companyWebsite">Company Website</label>
        <input type="text" id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-navy-900">{t.name}</label>
          <input id="name" name="name" type="text" required minLength={2} maxLength={120} className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-navy-900">{t.phone}</label>
          <input id="phone" name="phone" type="tel" required minLength={7} maxLength={30} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-navy-900">{t.email}</label>
        <input id="email" name="email" type="email" maxLength={200} className={inputClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="clientType" className="text-sm font-medium text-navy-900">{t.clientType}</label>
          <select id="clientType" name="clientType" required className={inputClass}>
            <option value="individual">{t.individual}</option>
            <option value="company">{t.company}</option>
          </select>
        </div>
        <div>
          <label htmlFor="preferredContact" className="text-sm font-medium text-navy-900">{t.preferredContact}</label>
          <select id="preferredContact" name="preferredContact" required className={inputClass}>
            <option value="phone">{locale === 'ar' ? 'الهاتف' : 'Phone'}</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">{locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="legalArea" className="text-sm font-medium text-navy-900">{t.legalArea}</label>
        <select id="legalArea" name="legalArea" className={inputClass} defaultValue="">
          <option value="" disabled>
            {locale === 'ar' ? 'اختر المجال' : 'Select an area'}
          </option>
          {practiceAreaOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          <option value={locale === 'ar' ? 'غير ذلك' : 'Other'}>{locale === 'ar' ? 'غير ذلك' : 'Other'}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-navy-900">{t.message}</label>
        <textarea id="message" name="message" rows={4} maxLength={2000} className={inputClass} />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-navy-900">{t.urgency}</legend>
        <div className="mt-2 flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="urgency" value="normal" defaultChecked required /> {t.normal}
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="urgency" value="urgent" required /> {t.urgent}
          </label>
        </div>
      </fieldset>

      <label className="flex items-start gap-2 text-xs text-navy-900/80">
        <input type="checkbox" name="consent" required className="mt-0.5" />
        <span>{t.consent}</span>
      </label>

      {status === 'error' ? <p className="text-sm font-medium text-alert-red">{t.error}</p> : null}

      <Button type="submit" disabled={status === 'submitting'} className="w-full justify-center sm:w-auto">
        {status === 'submitting' ? t.submitting : t.submit}
      </Button>
    </form>
  )
}
