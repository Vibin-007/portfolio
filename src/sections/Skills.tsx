import { skills } from "@/data/skills";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/SectionHeading";

export function Skills() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="skills" ref={ref} className="section border-t border-line">
      <div className="shell">
        <SectionHeading
          eyebrow="02 — Capabilities"
          lines={["TOOLS FOR TURNING", "IDEAS INTO REALITY."]}
        />

        <ul className="mt-16 md:mt-20" data-reveal="stagger">
          {skills.map((skill) => (
            <li
              key={skill.id}
              className="group relative border-t border-line last:border-b"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-paper transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />

              <div className="grid gap-6 py-9 transition-colors duration-500 md:grid-cols-12 md:gap-10 md:py-12">
                <div className="md:col-span-2">
                  <span className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-none text-muted transition-colors duration-500 group-hover:text-paper">
                    {skill.index}
                  </span>
                </div>

                <div className="md:col-span-6">
                  <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-paper transition-transform duration-700 ease-[var(--ease-out-expo)] md:group-hover:translate-x-2">
                    {skill.title}
                  </h3>
                  <p className="mt-4 max-w-prose text-[0.95rem] leading-relaxed text-paper/65">
                    {skill.description}
                  </p>
                </div>

                <div className="md:col-span-4">
                  <p className="eyebrow mb-4">{skill.listLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="tag transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:border-line-strong group-hover:text-paper/90 md:group-hover:-translate-y-0.5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
