import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: process.env['PLAYWRIGHT_BASE_URL'] ?? 'http://localhost:3000',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Use the environment's pre-installed Chromium rather than the
        // headless-shell build @playwright/test would otherwise try to
        // download (network-restricted sandbox — see TESTING.md).
        launchOptions: { executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' },
      },
    },
  ],
})
