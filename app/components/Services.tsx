const services = [
  { number: "01", title: "DIGITAL PRODUCTS", description: "SaaS platforms, internal systems, web applications" },
  { number: "02", title: "WEB EXPERIENCES", description: "Landing pages, marketing sites, interactive experiences" },
  { number: "03", title: "AI & AUTOMATION", description: "Machine learning, workflow automation, intelligent systems" },
  { number: "04", title: "SYSTEMS & APIs", description: "Backend architecture, REST/GraphQL, microservices" },
  { number: "05", title: "DATA & DASHBOARDS", description: "Analytics, visualization, real-time monitoring" },
];

export default function Services() {
  return (
    <section id="services" className="bg-dark py-20 md:py-32" aria-labelledby="services-heading">
      <div className="mx-auto max-w-5xl px-6">
        <h2 id="services-heading" className="mb-10 text-3xl font-bold tracking-tight md:mb-16 md:text-5xl">WHAT WE DO.</h2>
        <div className="border-b border-light/15">
          {services.map((service) => (
            <details key={service.number} className="service-item group border-t border-light/15">
              <summary className="flex min-h-20 cursor-pointer list-none items-center gap-4 py-7 md:gap-8 md:py-9">
                <span className="font-mono text-xs text-light/60" aria-hidden="true">{service.number}</span>
                <h3 className="flex-1 text-base font-bold tracking-tight transition-colors group-open:text-accent md:text-2xl">{service.title}</h3>
                <span className="service-toggle flex size-8 items-center justify-center text-accent" aria-hidden="true">+</span>
              </summary>
              <p className="max-w-2xl pb-8 pl-8 text-base leading-relaxed text-light/70 md:pl-12">{service.description}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
