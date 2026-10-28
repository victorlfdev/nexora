export default function About() {
  return (
    <section id="about" className="relative flex min-h-[65svh] items-center justify-center border-t border-light/10 bg-dark px-6 py-20 md:py-28" aria-labelledby="about-heading">
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="about-heading" className="text-[clamp(1.75rem,3.5vw,3.5rem)] font-bold leading-[1.2] tracking-tight">
          Technology should feel invisible.
          <span className="mt-4 block text-accent">The experience shouldn&apos;t.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-light/70 md:text-lg">
          We combine strategy, design and engineering to build digital products
          that solve real problems and feel effortless to use. Based in São
          Paulo, working globally.
        </p>
      </div>
    </section>
  );
}
