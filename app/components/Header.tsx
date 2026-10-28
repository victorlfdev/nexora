import ArrowIcon from "./ArrowIcon";

export default function Header() {
  return (
    <header className="site-header absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-6 md:px-12 md:py-8">
        <a href="#top" aria-label="Nexora — back to top" className="brand-link text-lg font-bold tracking-[0.2em]">NEXORA<span className="text-accent">.</span></a>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-1 sm:gap-5">
          <a className="nav-link" href="#services">Services</a>
          <a className="nav-link" href="#work">Work</a>
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link nav-contact" href="#contact">Let’s talk <ArrowIcon /></a>
        </nav>
      </div>
    </header>
  );
}
