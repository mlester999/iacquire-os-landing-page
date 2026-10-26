import type { RegistrationValidation } from "./demo-validation.mjs";

export { INDUSTRIES, validateDemoRegistration } from "./demo-validation.mjs";

export function createBackendSignature(timestamp: string, body: string, secret: string): string;
export function createRateLimiter(options?: {
  limit?: number;
  windowMs?: number;
  now?: () => number;
}): (key: string) => { allowed: boolean; retryAfter: number };
export function handleDemoRegistrationRequest(
  request: Request,
  options?: {
    env?: Record<string, string | undefined>;
    fetchImpl?: typeof fetch;
    now?: () => number;
    rateLimiter?: (key: string) => { allowed: boolean; retryAfter: number };
  },
): Promise<Response>;
export type { RegistrationValidation };
