import { projects } from "@/data/projects";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectPanel } from "@/components/ProjectPanel";

export function Projects() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="work" ref={ref} className="section border-t border-line">
      <div className="shell">
        <SectionHeading
          eyebrow="03 — Selected Work"
          lines={["A SELECTION OF", "THINGS I'VE BUILT."]}
        >
          <p className="body-lg mt-8 max-w-xl" data-reveal="up">
            Academic and personal projects spanning full-stack web, mobile applications, and intelligent
            systems. Each panel links out only where a public destination genuinely exists.
          </p>
        </SectionHeading>

        <div className="mt-14 md:mt-20">
          {projects.map((project, index) => (
            <ProjectPanel key={project.id} project={project} reversed={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
