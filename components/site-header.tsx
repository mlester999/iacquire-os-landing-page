"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon, MenuIcon } from "@/components/icons";

const navigation = [
  { href: "#system", label: "The system" },
  { href: "#work", label: "Selected work" },
  { href: "#pricing", label: "Investment" },
  { href: "#founder", label: "About" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="nav-wrap container">
        <a className="brand" href="#home" aria-label="iAcquireOS by Argel Platon, home" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">iA</span>
          <span className="brand-name">iAcquire<span>OS</span><small>by Argel Platon</small></span>
        </a>

        <nav id="primary-navigation" className={`primary-nav${menuOpen ? " is-open" : ""}`} aria-label="Primary navigation">
          {navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="button button-primary nav-cta" href="#demo" onClick={closeMenu}>
            Try Free Demo <ArrowRightIcon />
          </a>
        </nav>

        <button
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
