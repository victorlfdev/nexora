"use client";

import { useRef, type RefObject } from "react";
import type Lenis from "lenis";

interface FooterProps {
  lenisRef: RefObject<Lenis | null>;
}

export default function Footer({ lenisRef }: FooterProps) {
  const links = [
    { label: "Instagram", href: "https://instagram.com/nexora" },
    { label: "LinkedIn", href: "https://linkedin.com/company/nexora" },
    { label: "GitHub", href: "https://github.com/nexora" },
    { label: "Email", href: "mailto:hello@nexora.dev" },
  ];

  return (
    <footer className="border-t border-light/10 bg-dark px-6 py-16" role="contentinfo">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold tracking-widest text-light">
              NEXORA
            </h3>
            <p className="mt-2 font-mono text-xs tracking-[0.2em] text-light/30">
              DIGITAL SYSTEMS
            </p>
            <p className="mt-1 font-mono text-xs tracking-[0.2em] text-light/30">
              & EXPERIENCES
            </p>
            <p className="mt-4 font-mono text-xs tracking-wider text-light/20">
              SÃO PAULO · BRAZIL
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-start md:items-end">
            <nav className="space-y-3" aria-label="Social links">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-mono text-xs tracking-widest text-light/40 transition-colors duration-200 hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-light/5">
          <p className="font-mono text-[10px] tracking-widest text-light/20">
            © 2026 NEXORA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
