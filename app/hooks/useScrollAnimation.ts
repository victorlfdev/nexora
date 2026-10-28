"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const desktopMotion = "(min-width: 768px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)";

// Setups live outside components so effects don't restart on interaction.
export function useScrollAnimation(
  scope: RefObject<HTMLElement | null>,
  setup: (element: HTMLElement) => void | (() => void),
  query = desktopMotion,
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = scope.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add(query, () => setup(element), scope);
    return () => media.revert();
  }, [scope, setup, query]);
}
