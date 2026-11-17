import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { revealClip, revealUp, revealWords } from "@/animations/transitions";

/**
 * Declarative scroll reveals for a section root.
 *
 * Mark descendants with:
 *  - data-reveal="words"   → masked word reveal (SplitText headings)
 *  - data-reveal="up"      → single element rise-in
 *  - data-reveal="stagger" → stagger the element's direct children
 *  - data-reveal="clip"    → clip-path media reveal
 *
 * Kept deliberately non-nested to avoid duplicate triggers.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal="words"]', el).forEach((node) => revealWords(node));

      gsap.utils.toArray<HTMLElement>('[data-reveal="up"]', el).forEach((node) =>
        revealUp(node, { trigger: node }),
      );

      gsap.utils.toArray<HTMLElement>('[data-reveal="stagger"]', el).forEach((node) => {
        const targets = node.children.length ? (Array.from(node.children) as HTMLElement[]) : node;
        revealUp(targets, { stagger: 0.1, trigger: node });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="clip"]', el).forEach((node) => revealClip(node));
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return ref;
}
