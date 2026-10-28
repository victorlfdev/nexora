const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Our process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Email", href: "mailto:hello@nexora.dev" },
];

export default function Footer() {
  return (
    <footer className="border-t border-light/15 bg-dark px-6 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <a href="#top" className="brand-link text-xl font-bold tracking-[0.2em]" aria-label="Nexora — back to top">NEXORA<span className="text-accent">.</span></a>
            <p className="mt-3 text-sm text-light/70">Digital Systems & Experiences</p>
            <p className="mt-2 text-sm text-light/60">São Paulo · Brazil</p>
          </div>
          <nav className="flex flex-wrap items-start gap-x-5 gap-y-1 md:max-w-xs md:justify-end" aria-label="Footer navigation">
            {links.map((link) => <a key={link.label} href={link.href} className="nav-link">{link.label}</a>)}
          </nav>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-light/15 pt-6 text-xs text-light/60 sm:flex-row">
          <p>© {new Date().getFullYear()} NEXORA. All rights reserved.</p>
          <p>Portfolio concept · Illustrative projects</p>
        </div>
      </div>
    </footer>
  );
}
