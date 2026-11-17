import { gsap } from "./gsap";
import { prefersReducedMotion } from "./transitions";

const q = <T extends Element = HTMLElement>(root: ParentNode, selector: string) =>
  Array.from(root.querySelectorAll<T>(selector));

/**
 * Plays once, after the loader resolves, revealing hero typography in a
 * deliberate sequence.
 */
export function createHeroIntro(root: HTMLElement): gsap.core.Timeline {
  const words = q(root, '[data-hero="headline"] .word');
  const name = q(root, '[data-hero="name"]');
  const subtitle = q(root, '[data-hero="subtitle"]');
  const ctas = q(root, '[data-hero="ctas"] > *');
  const meta = q(root, '[data-hero="meta"] > *');
  const portrait = q(root, '[data-hero="portrait"]');

  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

  if (prefersReducedMotion()) {
    gsap.set([...words, ...name, ...subtitle, ...ctas, ...meta, ...portrait], {
      clearProps: "all",
      opacity: 1,
      y: 0,
      yPercent: 0,
    });
    return tl;
  }

  gsap.set([...name, ...subtitle, ...ctas, ...meta, ...portrait], { autoAlpha: 1 });

  tl.from(words, { yPercent: 118, opacity: 0, duration: 1.2, stagger: 0.09 }, 0.1)
    .from(portrait, { y: 30, autoAlpha: 0, duration: 1.1, ease: "power2.out" }, 0.25)
    .from(name, { y: 22, autoAlpha: 0, duration: 0.9 }, 0.35)
    .from(subtitle, { y: 24, autoAlpha: 0, duration: 0.9 }, 0.5)
    .from(ctas, { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.65)
    .from(meta, { y: 14, autoAlpha: 0, duration: 0.7, stagger: 0.06 }, 0.8);

  return tl;
}

/** Scroll-linked hero choreography: fade of the foreground copy. */
export function setupHeroScroll(root: HTMLElement) {
  const content = root.querySelector<HTMLElement>('[data-hero="content"]');
  const veil = root.querySelector<HTMLElement>('[data-hero="veil"]');

  if (prefersReducedMotion()) return;

  if (content) {
    gsap.to(content, {
      yPercent: -14,
      autoAlpha: 0,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom 30%",
        scrub: true,
      },
    });
  }

  if (veil) {
    gsap.to(veil, {
      autoAlpha: 1,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom 55%",
        scrub: true,
      },
    });
  }
}
