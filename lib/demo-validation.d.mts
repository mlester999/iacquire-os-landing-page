export interface IndustryOption {
  value:
    | "real_estate"
    | "healthcare"
    | "home_services"
    | "agency"
    | "consulting"
    | "legal_finance"
    | "local_services"
    | "ecommerce"
    | "other";
  label: string;
}

export const INDUSTRIES: readonly IndustryOption[];
export type IndustryKey = IndustryOption["value"];

export interface RegistrationData {
  fullName: string;
  email: string;
  businessName: string;
  industry: IndustryKey;
  consent: true;
  marketingOptIn: boolean;
}

export type RegistrationValidation =
  | { success: true; data: RegistrationData }
  | { success: false; fieldErrors: Record<string, string> };

export function validateDemoRegistration(input: unknown): RegistrationValidation;
