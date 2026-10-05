import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/tests',
  snapshotPathTemplate: '{testDir}/screenshots/{testFilePath}/{arg}{ext}',
  fullyParallel: true,
  workers: process.env.CI ? 1 : 2,
  retries: 2,
  reporter: [['line'], ['html']],
  timeout: 30 * 1000,
  expect: {
    timeout: 15 * 1000,
  },

  use: {
    navigationTimeout: 10 * 1000,

    baseURL: 'https://userinyerface.com/',
    trace: 'on-first-retry',
    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
