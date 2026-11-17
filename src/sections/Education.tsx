import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/animations/gsap";
import { setupEducationTimeline } from "@/animations/scrollScenes";
import { education } from "@/data/education";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/SectionHeading";

export function Education() {
  const ref = useReveal<HTMLElement>();
  const lineRoot = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = lineRoot.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      setupEducationTimeline(el);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={ref} className="section border-t border-line">
      <div className="shell">
        <SectionHeading eyebrow="07 — Education" lines={["THE FOUNDATION."]} />

        <div ref={lineRoot} className="relative mt-16 md:mt-20">
          <span
            data-education-line
            aria-hidden="true"
            className="absolute left-[2px] top-2 h-[calc(100%_-_2rem)] w-px origin-top bg-line"
            style={{ transform: "scaleY(0)" }}
          />

          <ol className="relative">
            {education.map((entry) => (
              <li
                key={entry.id}
                className="group relative grid gap-4 border-t border-line py-9 pl-6 last:border-b md:grid-cols-12 md:gap-10 md:py-12 md:pl-10"
                data-reveal="up"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-[2px] top-[2.6rem] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-muted transition-colors duration-500 group-hover:bg-paper md:top-[3.1rem]"
                />

                <div className="md:col-span-3">
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted">{entry.period}</span>
                </div>

                <div className="md:col-span-9">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] leading-tight text-paper">
                      {entry.qualification}
                    </h3>
                    {entry.status ? (
                      <span className="tag border-line-strong text-paper/80">{entry.status}</span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-[0.98rem] text-paper/65">{entry.institution}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
