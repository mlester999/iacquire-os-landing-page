export const INDUSTRIES = Object.freeze([
  Object.freeze({ value: "real_estate", label: "Real estate" }),
  Object.freeze({ value: "healthcare", label: "Healthcare" }),
  Object.freeze({ value: "home_services", label: "Home services" }),
  Object.freeze({ value: "agency", label: "Marketing or creative agency" }),
  Object.freeze({ value: "consulting", label: "Consulting" }),
  Object.freeze({ value: "legal_finance", label: "Legal or financial services" }),
  Object.freeze({ value: "local_services", label: "Local services" }),
  Object.freeze({ value: "ecommerce", label: "Ecommerce" }),
  Object.freeze({ value: "other", label: "Other" }),
]);

const INDUSTRY_KEYS = new Set(INDUSTRIES.map(({ value }) => value));

function cleanText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function validateDemoRegistration(input) {
  const fieldErrors = {};
  const fullName = cleanText(input?.fullName, 120);
  const email = cleanText(input?.email, 254).toLowerCase();
  const businessName = cleanText(input?.businessName, 160);
  const industry = typeof input?.industry === "string" ? input.industry : "";
  const marketingOptIn = input?.marketingOptIn === true;

  if (fullName.length < 1) fieldErrors.fullName = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (businessName.length < 1) fieldErrors.businessName = "Enter your business name.";
  if (!INDUSTRY_KEYS.has(industry)) fieldErrors.industry = "Choose an industry.";
  if (input?.consent !== true) {
    fieldErrors.consent = "Please read and acknowledge the demo privacy notice.";
  }
  if (input?.marketingOptIn !== undefined && typeof input.marketingOptIn !== "boolean") {
    fieldErrors.marketingOptIn = "The marketing preference is invalid.";
  }

  if (Object.keys(fieldErrors).length) {
    return { success: false, fieldErrors };
  }

  return {
    success: true,
    data: {
      fullName,
      email,
      businessName,
      industry,
      consent: true,
      marketingOptIn,
    },
  };
}
