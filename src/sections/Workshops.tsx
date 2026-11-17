import { workshops } from "@/data/workshops";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/SectionHeading";

export function Workshops() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="experience" ref={ref} className="section border-t border-line">
      <div className="shell">
        <SectionHeading eyebrow="05 — Learning" lines={["ALWAYS LEARNING.", "ALWAYS BUILDING."]}>
          <p className="body-lg mt-8 max-w-xl" data-reveal="up">
            Intensive programmes and workshops that shaped my foundation in machine learning and generative
            AI. Listed without invented dates or credentials.
          </p>
        </SectionHeading>

        <div className="relative mt-16 md:mt-20">
          <span className="absolute left-[3px] top-3 hidden h-[calc(100%_-_2rem)] w-px bg-line md:block" aria-hidden="true" />
          <ol className="space-y-14 md:space-y-20">
            {workshops.map((workshop) => (
              <li key={workshop.id} className="grid gap-6 md:grid-cols-12 md:gap-10" data-reveal="up">
                <div className="flex items-start gap-4 md:col-span-4">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-paper/70" aria-hidden="true" />
                  <div>
                    <p className="eyebrow">Workshop</p>
                    <p className="mt-2 font-display text-lg leading-tight text-paper">{workshop.institution}</p>
                  </div>
                </div>

                <div className="md:col-span-8">
                  <h3 className="title-lg text-paper">{workshop.title}</h3>
                  <p className="mt-4 max-w-prose text-[0.98rem] leading-relaxed text-paper/70">
                    {workshop.description}
                  </p>
                  <div className="mt-6">
                    <p className="eyebrow mb-3">{workshop.topicsLabel}</p>
                    <div className="flex flex-wrap gap-2">
                      {workshop.topics.map((topic) => (
                        <span key={topic} className="tag">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
