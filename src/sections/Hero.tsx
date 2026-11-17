import { useLayoutEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "@/animations/gsap";
import { createHeroIntro, setupHeroScroll } from "@/animations/heroTimeline";
import { hero } from "@/data/site";
import { scrollToTarget } from "@/lib/smoothScroll";
import { SplitText } from "@/components/SplitText";

interface HeroProps {
  intro: boolean;
}

export function Hero({ intro }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      setupHeroScroll(el);
    }, el);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!intro || !el) return;
    const ctx = gsap.context(() => {
      createHeroIntro(el);
    }, el);
    return () => ctx.revert();
  }, [intro]);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-[100svh] w-full overflow-hidden">
      <div
        data-hero="veil"
        className="pointer-events-none absolute inset-0 z-10 bg-ink opacity-0"
        aria-hidden="true"
      />

      <div
        data-hero="content"
        className="shell relative z-20 flex min-h-[100svh] flex-col justify-between py-10 md:py-12"
      >
        <div className="my-auto flex flex-col justify-between gap-10 py-2 md:py-4 lg:flex-row lg:items-center xl:gap-14">
          <div className="max-w-2xl xl:max-w-3xl">
            <div data-hero="headline">
              <SplitText as="h1" lines={hero.headlineLines} className="headline" />
            </div>

            <div className="mt-8 flex flex-col gap-6">
              <div className="max-w-xl">
                <p data-hero="name" className="font-mono text-[0.78rem] uppercase tracking-[0.42em] text-paper">
                  {hero.name}
                </p>
                <p data-hero="subtitle" className="body-lg mt-4">
                  {hero.subtitle}
                </p>
              </div>
            </div>

            <div data-hero="ctas" className="mt-9 flex flex-wrap items-center gap-3">
              <button type="button" className="btn btn--solid" onClick={() => scrollToTarget(hero.primaryCta.href)}>
                {hero.primaryCta.label}
                <ArrowUpRight size={15} strokeWidth={1.6} />
              </button>
              <button type="button" className="btn" onClick={() => scrollToTarget(hero.secondaryCta.href)}>
                {hero.secondaryCta.label}
              </button>
            </div>
          </div>

          <div
            data-hero="portrait"
            className="relative flex shrink-0 items-center justify-center lg:justify-end"
          >
            <div className="relative flex items-center justify-center">
              <div
                className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-gradient-to-tr from-paper/15 via-paper/5 to-transparent blur-3xl opacity-80"
                aria-hidden="true"
              />
              <img
                src="/images/PHOTO.png"
                alt={hero.name}
                width={955}
                height={1047}
                loading="eager"
                decoding="async"
                className="relative z-10 w-auto max-h-[54vh] sm:max-h-[60vh] lg:max-h-[72vh] xl:max-h-[78vh] max-w-[320px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[500px] xl:max-w-[580px] 2xl:max-w-[640px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] select-none pointer-events-none"
                style={{
                  maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>

        <div data-hero="meta" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-paper">
            <ArrowDown size={15} strokeWidth={1.6} className="drift" />
          </span>
          <span className="eyebrow">{hero.scrollHint}</span>
        </div>
      </div>
    </section>
  );
}
