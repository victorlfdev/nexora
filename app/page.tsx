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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

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
    ScrollTrigger.refresh();

    // Preloader duration
    const timer = setTimeout(() => setLoading(false), 2800);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, [isMobile]);

  return (
    <main className="relative">
      {loading && <Preloader onExit={() => setLoading(false)} />}
      {!loading && (
        <>
          <Hero />
          <ComplexityClarity />
          <Services lenisRef={lenisRef} isMobile={isMobile} />
          <Process lenisRef={lenisRef} isMobile={isMobile} />
          <Cases isMobile={isMobile} />
          <Technology isMobile={isMobile} />
          <About lenisRef={lenisRef} isMobile={isMobile} />
          <CTA lenisRef={lenisRef} isMobile={isMobile} />
          <Footer lenisRef={lenisRef} isMobile={isMobile} />
        </>
      )}
    </main>
  );
}
