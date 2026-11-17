import { ArrowUpRight } from "lucide-react";
import { about } from "@/data/site";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { scrollToTarget } from "@/lib/smoothScroll";

const marqueeItems = [
  "Machine Learning",
  "Data Science",
  "Python",
  "Flutter",
  "Django",
  "PostgreSQL",
  "Full-stack",
  "NLP",
];

export function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="about" ref={ref} className="section border-t border-line">
      <div className="shell">
        <SectionHeading eyebrow={about.eyebrow} lines={about.headlineLines} />

        <div className="mt-16 max-w-4xl md:mt-20">
          <p className="text-[clamp(1.15rem,2vw,1.6rem)] leading-[1.55] text-paper/85" data-reveal="up">
            {about.biography}
          </p>

          <div data-reveal="up" className="mt-10">
            <button type="button" className="btn btn--solid" onClick={() => scrollToTarget(about.cta.href)}>
              {about.cta.label}
              <ArrowUpRight size={15} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20 overflow-hidden border-y border-line py-6 md:mt-28" aria-hidden="true">
        <div className="marquee-track gap-12">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex shrink-0 items-center gap-12 font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-none text-paper/40"
            >
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
