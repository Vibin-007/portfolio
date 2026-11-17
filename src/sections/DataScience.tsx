import { Check, FlaskConical } from "lucide-react";
import { researchProjects } from "@/data/projects";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { AbstractVisual } from "@/components/mockups/AbstractVisual";

export function DataScience() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="lab" ref={ref} className="section border-t border-line">
      <div className="shell">
        <SectionHeading eyebrow="04 — Experiments & Research" lines={["EXPLORING INTELLIGENCE", "THROUGH DATA."]}>
          <p className="body-lg mt-8 max-w-xl" data-reveal="up">
            Applied experiments in OCR and natural language processing. Implemented functionality and planned
            directions are listed separately to keep the record accurate.
          </p>
        </SectionHeading>

        <div className="mt-16 grid gap-8 md:mt-20 md:grid-cols-2 md:gap-10">
          {researchProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col rounded-2xl border border-line bg-card p-6 transition-colors duration-500 hover:border-line-strong md:p-8"
              data-reveal="up"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-display text-3xl leading-none text-muted transition-colors duration-500 group-hover:text-paper">
                  {project.index}
                </span>
                <span className="eyebrow">{project.category}</span>
              </div>

              <h3 className="mt-6 font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-tight text-paper">
                {project.title}
              </h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-paper/65">{project.description}</p>

              <div className="mt-6" data-reveal="clip" role="img" aria-label={project.preview.alt}>
                <AbstractVisual variant={project.preview.variant === "scanner" ? "scanner" : "summarizer"} />
              </div>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="eyebrow mb-3">Implemented</p>
                  <ul className="space-y-2">
                    {project.implemented.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-paper/85">
                        <Check size={14} strokeWidth={1.8} className="mt-1 shrink-0 text-paper/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow mb-3">Conceptual</p>
                  <ul className="space-y-2">
                    {project.conceptual.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <FlaskConical size={14} strokeWidth={1.6} className="mt-1 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
