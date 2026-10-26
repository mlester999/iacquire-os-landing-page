export const INDUSTRIES: readonly [
  "B2B SaaS",
  "Marketing or creative agency",
  "Professional services",
  "Home services",
  "Ecommerce",
  "Other",
];

export interface RegistrationData {
  fullName: string;
  email: string;
  businessName: string;
  industry: (typeof INDUSTRIES)[number];
  marketingConsent: boolean;
}

export type RegistrationValidation =
  | { success: true; data: RegistrationData }
  | { success: false; fieldErrors: Record<string, string> };

export function validateDemoRegistration(input: unknown): RegistrationValidation;
