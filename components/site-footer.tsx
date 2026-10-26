import { ArrowUpRightIcon } from "@/components/icons";

const whatsapp =
  "https://wa.me/639124742642?text=Hi%20Argel%2C%20I%E2%80%99d%20like%20to%20book%20a%20free%20iAcquireOS%20consultation.";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <a className="brand footer-brand" href="#home" aria-label="iAcquireOS, back to top">
              <span className="brand-mark" aria-hidden="true">iA</span>
              <span className="brand-name">iAcquire<span>OS</span><small>by Argel Platon</small></span>
            </a>
            <p className="footer-description">A connected acquisition system for high-ticket B2B businesses.</p>
          </div>
          <div className="footer-links">
            <div>
              <span className="footer-label">Explore</span>
              <a href="#system">The system</a>
              <a href="#work">Selected work</a>
              <a href="#pricing">Investment</a>
              <a href="#faq">FAQs</a>
            </div>
            <div>
              <span className="footer-label">Connect</span>
              <a href="https://www.linkedin.com/in/argelplaton/" target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRightIcon />
              </a>
              <a href={whatsapp} target="_blank" rel="noreferrer">
                WhatsApp <ArrowUpRightIcon />
              </a>
              <a href="mailto:argelplaton.ai@gmail.com">Email Argel</a>
              <a href="/privacy">Privacy notice</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} iAcquireOS by Argel Platon</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
