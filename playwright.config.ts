import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  reporter: "list",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: "http://localhost:3001",
    browserName: "chromium",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: "npm run dev -- --hostname localhost --port 3001",
    url: "http://localhost:3001",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      ...process.env,
      DEMO_REGISTRATION_MODE: "mock",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  },
});
