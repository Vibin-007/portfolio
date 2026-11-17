import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

const NAV_OFFSET = -24;

export function scrollToTarget(target: string | HTMLElement | number) {
  if (instance) {
    if (typeof target === "string") {
      const el = document.querySelector(target);
      if (!el) return;
      instance.scrollTo(el as HTMLElement, { offset: NAV_OFFSET, duration: 1.25 });
      return;
    }
    instance.scrollTo(target, { offset: typeof target === "number" ? 0 : NAV_OFFSET, duration: 1.25 });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToTop() {
  scrollToTarget(0);
}

export function lockScroll(locked: boolean) {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.body.classList.toggle("is-locked", locked);
}
