"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// ─── Sections ───────────────────────────────────────────────
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import ComplexityClarity from "./components/ComplexityClarity";
import Services from "./components/Services";
import Process from "./components/Process";
import Cases from "./components/Cases";
import Technology from "./components/Technology";
import About from "./components/About";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef<Lenis>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1.001 - Math.pow(1 - t, 4), 1),
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Animation frame loop
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // GSAP scroll sync
    ScrollTrigger.addEventListener("refresh", () => lenis.scrollTo(0, { immediate: true }));
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative">
      {loading && <Preloader onExit={() => setLoading(false)} />}
      {!loading && (
        <>
          <Hero lenisRef={lenisRef} />
          <ComplexityClarity lenisRef={lenisRef} />
          <Services lenisRef={lenisRef} />
          <Process lenisRef={lenisRef} />
          <Cases lenisRef={lenisRef} />
          <Technology lenisRef={lenisRef} />
          <About lenisRef={lenisRef} />
          <CTA lenisRef={lenisRef} />
          <Footer lenisRef={lenisRef} />
        </>
      )}
    </main>
  );
}
