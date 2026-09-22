import { test, expect } from '@playwright/test'

test.describe('locale routing and RTL/LTR', () => {
  test('bare root redirects to the Arabic homepage for an Arabic-preferring visitor', async ({ browser }) => {
    // Locale is chosen from Accept-Language when no locale cookie is set yet
    // (see middleware.ts); use a dedicated context with an Arabic browser
    // locale so the test is deterministic and isolated from other tests'
    // cookies, regardless of the runner's default browser locale.
    const context = await browser.newContext({ locale: 'ar' })
    const page = await context.newPage()
    await page.goto('/')
    await expect(page).toHaveURL(/\/ar\/?$/)
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
    await context.close()
  })

  test('English homepage renders LTR', async ({ page }) => {
    await page.goto('/en')
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })

  test('language switch moves between ar and en on an equivalent page', async ({ page }) => {
    await page.goto('/ar/about')
    await page.getByRole('link', { name: 'English' }).click()
    await expect(page).toHaveURL(/\/en\/about\/?$/)
  })
})

test.describe('navigation and key pages', () => {
  test('primary nav links resolve without error', async ({ page }) => {
    await page.goto('/ar')
    for (const path of ['/ar/about', '/ar/team', '/ar/practice-areas', '/ar/industries', '/ar/insights', '/ar/contact']) {
      const response = await page.goto(path)
      expect(response?.status()).toBeLessThan(400)
    }
  })

  test('primary nav does not give Maritime a dedicated top-level link', async ({ page }) => {
    // Per the firm's direction, Maritime is one practice area among many
    // (reachable via Practice Areas), not a headline specialty with its own
    // nav slot or homepage spotlight — see CONTENT_REQUIRED.md.
    await page.goto('/ar')
    const nav = page.getByRole('navigation', { name: 'التنقل الرئيسي' })
    await expect(nav.getByRole('link', { name: /بحري/ })).toHaveCount(0)
  })

  test('a non-existent slug renders the custom 404 page', async ({ page }) => {
    const response = await page.goto('/ar/practice-areas/does-not-exist')
    expect(response?.status()).toBe(404)
    await expect(page.getByText('الصفحة غير موجودة')).toBeVisible()
  })
})

test.describe('lead generation CTAs', () => {
  test('mobile CTA bar exposes call, WhatsApp, and consultation actions', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/ar')
    const bar = page.getByRole('navigation', { name: 'إجراءات سريعة' })
    await expect(bar.getByRole('link', { name: /اتصل الآن/ })).toHaveAttribute('href', /^tel:\+201005029501$/)
    await expect(bar.getByRole('link', { name: /واتساب/ })).toHaveAttribute('href', /^https:\/\/wa\.me\/201005029501/)
    await expect(bar.getByRole('link', { name: /احجز استشارة/ })).toHaveAttribute('href', '/ar/consultation')
  })
})

test.describe('consultation form', () => {
  test('submits successfully and shows a confirmation message', async ({ page }) => {
    await page.goto('/ar/consultation')
    await page.getByLabel('الاسم بالكامل').fill('عميل تجريبي')
    await page.getByLabel('رقم الهاتف').fill('01099999999')
    await page.getByLabel(/أوافق على أن يتواصل معي المكتب/).check()
    await page.getByRole('button', { name: 'إرسال الطلب' }).click()
    await expect(page.getByText('تم استلام طلبك بنجاح')).toBeVisible()
  })
})

test.describe('SEO infrastructure', () => {
  test('robots.txt is served and points to the sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt')
    expect(response.status()).toBe(200)
    const body = await response.text()
    expect(body).toContain('Disallow: /admin')
    expect(body).toContain('Sitemap:')
  })

  test('sitemap.xml is served and contains locale-prefixed URLs', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    expect(response.status()).toBe(200)
    const body = await response.text()
    expect(body).toContain('/ar')
    expect(body).toContain('/en')
  })

  test('the admin panel is not indexed', async ({ request }) => {
    const response = await request.get('/admin')
    expect(response.headers()['x-robots-tag']).toContain('noindex')
  })
})
