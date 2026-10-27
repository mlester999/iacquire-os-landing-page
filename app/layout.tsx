import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl } from "@/lib/site";

const description =
  "iAcquireOS by Argel Platon — a founder-led AI client acquisition system for high-ticket B2B SaaS companies and agencies.";
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl, alternates: { canonical: "/" } } : {}),
  title: {
    default: "iAcquireOS by Argel Platon — Client Acquisition System",
    template: "%s | iAcquireOS",
  },
  description,
  openGraph: {
    ...(siteUrl ? { url: siteUrl } : {}),
    title: "iAcquireOS by Argel Platon — Client Acquisition System",
    description,
    type: "website",
    siteName: "iAcquireOS",
  },
  twitter: {
    card: "summary_large_image",
    title: "iAcquireOS by Argel Platon — Client Acquisition System",
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
