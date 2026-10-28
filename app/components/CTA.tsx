import ArrowIcon from "./ArrowIcon";

export default function CTA() {
  return (
    <section id="contact" className="relative flex min-h-[65svh] flex-col items-center justify-center bg-dark px-6 py-20" aria-labelledby="contact-heading">
      <div className="text-center">
        <h2 id="contact-heading" className="text-[clamp(2.5rem,6vw,6rem)] font-bold tracking-tight">HAVE AN IDEA?</h2>
        <p className="mt-3 text-[clamp(1.5rem,4vw,3.5rem)] font-bold tracking-tight text-accent">LET&apos;S BUILD IT.</p>
      </div>
      <a href="mailto:hello@nexora.dev?subject=Let%27s%20build%20a%20project" className="primary-link mt-10">Start a project <ArrowIcon /></a>
      <a href="mailto:hello@nexora.dev" className="mt-5 inline-flex min-h-11 items-center text-sm text-light/70 underline decoration-light/30 underline-offset-4 hover:text-light">hello@nexora.dev</a>
    </section>
  );
}
