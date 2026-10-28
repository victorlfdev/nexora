"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { desktopMotion } from "../hooks/useScrollAnimation";

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let disposed = false;
    let activeLenis: Lenis | undefined;
    let refreshFrame = 0;
    const refreshAfterToggle = (event: Event) => {
      if (!(event.target instanceof HTMLDetailsElement)) return;
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        activeLenis?.resize();
      });
    };
    document.addEventListener("toggle", refreshAfterToggle, true);
    media.add(desktopMotion, () => {
      const lenis = new Lenis({ duration: 1.05, anchors: true });
      activeLenis = lenis;
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
        activeLenis = undefined;
      };
    });
    void document.fonts.ready.then(() => {
      if (disposed) return;
      ScrollTrigger.refresh();
      // Native fragment scrolling runs before pinned sections add their spacing.
      // Resolve the original destination again after fonts and layout settle.
      let id = "";
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      const pin = ScrollTrigger.getAll().find((trigger) => trigger.trigger === target && trigger.pin);
      const top = Math.max(0, (pin?.start ?? target.getBoundingClientRect().top + window.scrollY) - 24);
      if (activeLenis) {
        activeLenis.resize();
        activeLenis.scrollTo(top, { immediate: true });
      } else window.scrollTo({ top, behavior: "instant" });
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      document.removeEventListener("toggle", refreshAfterToggle, true);
      media.revert();
    };
  }, []);
  return null;
}
