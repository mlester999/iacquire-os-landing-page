"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, MenuIcon } from "@/components/icons";

const navigation = [
  { href: "#problem", label: "Revenue Gap" },
  { href: "#system", label: "iAcquireOS" },
  { href: "#system-overview", label: "Difference" },
  { href: "#process", label: "Why Worth the Trust?" },
  { href: "#work", label: "View Built Projects" },
  { href: "#founder", label: "About Argel" },
  { href: "#contact", label: "Get started" },
];

const moreNavigation = [
  { href: "#pricing", label: "Investment" },
  { href: "#faq", label: "FAQs" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const moreMenuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        if (moreMenuRef.current) moreMenuRef.current.open = false;
        menuToggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    if (moreMenuRef.current) moreMenuRef.current.open = false;
  };

  return (
    <header className="site-header">
      <div className="nav-wrap container">
        <a className="brand nav-brand" href="#home" aria-label="iAcquireOS by Argel Platon, home" onClick={closeMenu}>
          <span>iAcquireOS <em>by Argel Platon</em></span>
        </a>

        <nav
          id="primary-navigation"
          className={`primary-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Primary navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape" && moreMenuRef.current?.open) {
              moreMenuRef.current.open = false;
              moreMenuRef.current.querySelector("summary")?.focus();
            }
          }}
        >
          {navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <details className="nav-more" ref={moreMenuRef}>
            <summary>More <span className="nav-more-caret" aria-hidden="true" /></summary>
            <div className="nav-more-menu">
              {moreNavigation.map((item) => (
                <a href={item.href} key={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
            </div>
          </details>
          <a className="button button-primary nav-cta" href="#demo" onClick={closeMenu}>
            Test the Free Demo <ArrowRightIcon />
          </a>
        </nav>

        <button
          ref={menuToggleRef}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon close={menuOpen} />
        </button>
      </div>
    </header>
  );
}
