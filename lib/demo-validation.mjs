export const INDUSTRIES = Object.freeze([
  "B2B SaaS",
  "Marketing or creative agency",
  "Professional services",
  "Home services",
  "Ecommerce",
  "Other",
]);

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

  if (fullName.length < 2) fieldErrors.fullName = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (businessName.length < 2) fieldErrors.businessName = "Enter your business name.";
  if (!INDUSTRIES.includes(industry)) fieldErrors.industry = "Choose an industry.";
  if (typeof input?.marketingConsent !== "boolean") {
    fieldErrors.marketingConsent = "The marketing preference is invalid.";
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
      marketingConsent: input.marketingConsent,
    },
  };
}
