"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const services = [
  {
    number: "01",
    title: "DIGITAL PRODUCTS",
    description: "SaaS platforms, internal systems, web applications",
  },
  {
    number: "02",
    title: "WEB EXPERIENCES",
    description: "Landing pages, marketing sites, interactive experiences",
  },
  {
    number: "03",
    title: "AI & AUTOMATION",
    description: "Machine learning, workflow automation, intelligent systems",
  },
  {
    number: "04",
    title: "SYSTEMS & APIs",
    description: "Backend architecture, REST/GraphQL, microservices",
  },
  {
    number: "05",
    title: "DATA & DASHBOARDS",
    description: "Analytics, visualization, real-time monitoring",
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, services.length);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setHoveredIndex(index);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = (index + 1) % services.length;
        setFocusedIndex(next);
        itemRefs.current[next]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (index - 1 + services.length) % services.length;
        setFocusedIndex(prev);
        itemRefs.current[prev]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        setFocusedIndex(0);
        itemRefs.current[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        setFocusedIndex(services.length - 1);
        itemRefs.current[services.length - 1]?.focus();
      }
    },
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-item",
        {
          opacity: 0,
          x: -40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current as HTMLElement,
            start: "top top+=100",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark py-32"
      aria-label="Our services"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-light/40">
            WHAT WE DO
          </span>
        </div>

        <div
          className="space-y-0"
          role="list"
          aria-label="Services list"
        >
          {services.map((service, i) => (
            <div
              key={service.number}
              className="service-item relative border-t border-light/10"
              role="listitem"
            >
              <div
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                tabIndex={0}
                role="button"
                aria-label={`${service.title} — ${service.description}`}
                className={`group flex cursor-pointer items-center justify-between py-10 transition-all duration-300 hover:border-l-2 hover:border-l-accent hover:pl-4 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark ${
                  focusedIndex === i ? "border-l-2 border-l-accent pl-4" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setFocusedIndex(i)}
                onBlur={() => setFocusedIndex(null)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              >
                <div className="flex items-center gap-8">
                  <span className="font-mono text-xs tracking-widest text-light/30">
                    {service.number}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-light group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
                <span className="text-light/20 group-hover:text-accent transition-colors duration-300">
                  →
                </span>
              </div>

              {hoveredIndex === i && (
                <div className="absolute right-0 top-1/2 mr-8 -translate-y-1/2 max-w-[200px] font-mono text-xs tracking-wider text-light/40">
                  {service.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
