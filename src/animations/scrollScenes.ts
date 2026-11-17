import { gsap } from "./gsap";
import { prefersReducedMotion } from "./transitions";

/**
 * Draws the education timeline line downward as the section passes through the
 * viewport. Scrubbed so it never becomes a distracting entrance.
 */
export function setupEducationTimeline(root: HTMLElement) {
  const line = root.querySelector<HTMLElement>("[data-education-line]");
  if (!line) return;

  if (prefersReducedMotion()) {
    gsap.set(line, { scaleY: 1, clearProps: "transform" });
    return;
  }

  gsap.fromTo(
    line,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: "none",
      transformOrigin: "top center",
      scrollTrigger: {
        trigger: root,
        start: "top 72%",
        end: "bottom 72%",
        scrub: true,
      },
    },
  );
}

/**
 * Contact finale: the oversized wordmark drifts upward as the section settles,
 * giving the page a deliberate close.
 */
export function setupContactFinale(root: HTMLElement) {
  const mark = root.querySelector<HTMLElement>("[data-contact-mark]");
  if (!mark) return;

  if (prefersReducedMotion()) {
    gsap.set(mark, { yPercent: 0, clearProps: "transform" });
    return;
  }

  gsap.fromTo(
    mark,
    { yPercent: 24 },
    {
      yPercent: -4,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    },
  );
}
