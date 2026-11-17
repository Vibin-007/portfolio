import { ArrowUpRight, Lock } from "lucide-react";
import { GithubMark } from "@/components/BrandIcons";
import type { Project } from "@/data/projects";
import { BrowserMock } from "./mockups/BrowserMock";
import { PhoneMock } from "./mockups/PhoneMock";
import { Tilt } from "./mockups/Tilt";

interface ProjectPanelProps {
  project: Project;
  /** Alternate the visual side for an asymmetric editorial rhythm. */
  reversed?: boolean;
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.preview.kind === "phone") return <PhoneMock />;
  return (
    <BrowserMock
      variant={project.preview.variant as "event" | "portfolio" | "campnotes" | "queueless"}
      image={project.preview.image}
      alt={project.preview.alt}
    />
  );
}

export function ProjectPanel({ project, reversed = false }: ProjectPanelProps) {
  const hasLive = Boolean(project.liveUrl);
  const hasCode = Boolean(project.githubUrl);

  return (
    <article className="group grid items-center gap-8 border-t border-line py-14 md:grid-cols-12 md:gap-12 md:py-20">
      <div className={`md:col-span-5 ${reversed ? "md:order-2" : ""}`}>
        <div className="mb-6 flex items-baseline gap-4">
          <span
            className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none text-muted transition-colors duration-500 group-hover:text-paper"
            data-reveal="up"
            data-project-number
          >
            {project.index}
          </span>
          <span className="eyebrow">{project.category}</span>
        </div>

        <h3 className="title-lg text-paper" data-reveal="up">
          {project.title}
        </h3>

        <p className="body-lg mt-5 max-w-prose" data-reveal="up">
          {project.description}
        </p>

        {project.note ? (
          <p className="mt-4 max-w-prose border-l border-line pl-4 text-sm leading-relaxed text-muted" data-reveal="up">
            {project.note}
          </p>
        ) : null}

        <div className="mt-7 flex flex-wrap gap-2" data-reveal="stagger">
          {project.technologies.map((tech) => (
            <span key={tech} className="tag group-hover:border-line-strong">
              {tech}
            </span>
          ))}
        </div>

        {(hasLive || hasCode || project.status) ? (
          <div className="mt-8 flex flex-wrap items-center gap-5" data-reveal="up">
            {hasLive ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer noopener" className="ulink text-sm text-paper">
                View live
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
            ) : null}

            {hasCode ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer noopener" className="ulink text-sm text-paper">
                <GithubMark size={15} />
                Source code
              </a>
            ) : null}

            {!hasLive && !hasCode && project.status ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                <Lock size={12} strokeWidth={1.6} />
                {project.status}
              </span>
            ) : null}

            {hasLive && !hasCode && project.status ? (
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">{project.status}</span>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className={`md:col-span-7 ${reversed ? "md:order-1" : ""}`}>
        <div className="perspective" data-reveal="clip" role="img" aria-label={project.preview.alt}>
          <Tilt className="transition-transform duration-700 ease-[var(--ease-out-expo)] will-change-transform md:group-hover:-translate-y-2">
            <ProjectVisual project={project} />
          </Tilt>
        </div>
      </div>
    </article>
  );
}
