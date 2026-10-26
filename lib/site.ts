export function getSiteUrl(): URL | undefined {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return undefined;

  try {
    const url = new URL(configured);
    if (url.protocol !== "https:" && process.env.NODE_ENV === "production") {
      return undefined;
    }
    return url;
  } catch {
    return undefined;
  }
}

export function getAppOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_APP_ORIGIN?.trim();
  if (!configured) return "https://iacquire.online";

  try {
    const url = new URL(configured);
    if (url.protocol !== "https:" && process.env.NODE_ENV === "production") {
      return "https://iacquire.online";
    }
    return url.origin;
  } catch {
    return "https://iacquire.online";
  }
}
