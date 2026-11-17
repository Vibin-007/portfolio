import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/animations/gsap";
import { prefersReducedMotion } from "@/animations/transitions";

interface LoaderProps {
  /** 0 → 100, derived from real readiness gates (never a fake counter). */
  progress: number;
  /** When true the overlay plays its exit and then unmounts. */
  done: boolean;
  onComplete: () => void;
}

export function Loader({ progress, done, onComplete }: LoaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  useLayoutEffect(() => {
    if (!done || doneRef.current) return;
    doneRef.current = true;

    const el = root.current;
    if (!el) {
      completeRef.current();
      return;
    }

    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 0 });
      completeRef.current();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => completeRef.current(),
      defaults: { ease: "expo.inOut" },
    });

    const inner = el.querySelector('[data-loader="inner"]');
    if (inner) {
      tl.to(inner, { yPercent: -18, autoAlpha: 0, duration: 0.5, ease: "power2.in" });
    }
    tl.to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9 }, inner ? 0.35 : 0);

    return () => {
      tl.kill();
    };
  }, [done]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-ink px-[var(--gutter)] py-8"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div data-loader="inner" className="flex flex-col justify-between h-full">
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-[clamp(3rem,12vw,9rem)] leading-[0.9] text-paper">Vibin&nbsp;D.</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <span className="eyebrow">Preparing experience</span>
            <span className="font-display text-[clamp(1.6rem,4vw,2.6rem)] leading-none text-paper tabular-nums">
              {Math.round(progress)}
              <span className="text-muted">%</span>
            </span>
          </div>
          <div className="rule relative overflow-hidden" aria-hidden="true">
            <div
              className="absolute inset-y-0 left-0 bg-paper transition-[width] duration-500 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
