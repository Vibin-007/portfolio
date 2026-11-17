import { gsap, ScrollTrigger } from "./gsap";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isDesktopPointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function collectWords(scope: HTMLElement): HTMLElement[] {
  return gsap.utils.toArray<HTMLElement>(".word", scope);
}

interface RevealWordsOptions {
  delay?: number;
  stagger?: number;
  start?: string;
  trigger?: Element | null;
}

/** Masked word-by-word reveal for headlines built with the SplitText layout. */
export function revealWords(scope: HTMLElement, options: RevealWordsOptions = {}) {
  const { delay = 0, stagger = 0.05, start = "top 84%", trigger } = options;
  const words = collectWords(scope);
  if (!words.length) return;

  if (prefersReducedMotion()) {
    gsap.set(words, { yPercent: 0, opacity: 1, clearProps: "transform" });
    return;
  }

  gsap.from(words, {
    yPercent: 118,
    opacity: 0,
    duration: 1.05,
    ease: "expo.out",
    stagger,
    delay,
    scrollTrigger: {
      trigger: trigger ?? scope,
      start,
      once: true,
    },
  });
}

interface RevealUpOptions {
  y?: number;
  delay?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  trigger?: Element | null;
}

/** Generic staggered rise-in for arbitrary elements. */
export function revealUp(targets: gsap.TweenTarget, options: RevealUpOptions = {}) {
  const {
    y = 30,
    delay = 0,
    stagger = 0.09,
    duration = 1,
    start = "top 86%",
    trigger,
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(targets, { autoAlpha: 1, y: 0 });
    return;
  }

  gsap.from(targets, {
    y,
    autoAlpha: 0,
    duration,
    delay,
    stagger,
    ease: "expo.out",
    scrollTrigger: trigger
      ? { trigger, start, once: true }
      : undefined,
  });
}

/** Clip-path / scale mask reveal for media + mockups. */
export function revealClip(target: Element, options: { delay?: number; start?: string } = {}) {
  const { delay = 0, start = "top 82%" } = options;

  if (prefersReducedMotion()) {
    gsap.set(target, { clipPath: "inset(0% 0% 0% 0%)", scale: 1 });
    return;
  }

  gsap.fromTo(
    target,
    { clipPath: "inset(14% 12% 14% 12%)", scale: 1.06 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      duration: 1.4,
      delay,
      ease: "expo.out",
      scrollTrigger: { trigger: target, start, once: true },
    },
  );
}

/** Thin progress line at the very top of the viewport. */
export function setupScrollProgress(bar: HTMLElement) {
  gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
  ScrollTrigger.create({
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      gsap.set(bar, { scaleX: self.progress });
    },
  });
}

export { gsap, ScrollTrigger };
