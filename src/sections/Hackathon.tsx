import { Award, Code2, Globe, Trophy } from "lucide-react";
import { hackathon } from "@/data/workshops";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/SectionHeading";

export function Hackathon() {
  const ref = useReveal<HTMLElement>();
  const hasWebsite = Boolean(hackathon.websiteUrl);
  const hasCode = Boolean(hackathon.codeUrl);

  return (
    <section id="recognition" ref={ref} className="section border-t border-line">
      <div className="shell">
        <SectionHeading eyebrow={hackathon.eyebrow} lines={hackathon.headlineLines} />

        <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-12 md:items-center md:gap-16">
          <div className="md:col-span-7">
            <p className="eyebrow text-paper/70" data-reveal="up">
              {hackathon.event}
            </p>

            <h3
              className="mt-5 font-display text-[clamp(1.8rem,4.4vw,3.6rem)] leading-[1.02] text-paper"
              data-reveal="up"
            >
              {hackathon.award}
            </h3>

            <p className="body-lg mt-7 max-w-prose" data-reveal="up">
              {hackathon.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3" data-reveal="up">
              {hasWebsite ? (
                <a
                  href={hackathon.websiteUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn--solid"
                >
                  <Globe size={15} strokeWidth={1.6} />
                  View website
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                  <Globe size={13} strokeWidth={1.6} />
                  Event site not published
                </span>
              )}

              {hasCode ? (
                <a href={hackathon.codeUrl} target="_blank" rel="noreferrer noopener" className="btn">
                  <Code2 size={15} strokeWidth={1.6} />
                  View code
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                  <Code2 size={13} strokeWidth={1.6} />
                  Repository not published
                </span>
              )}
            </div>
          </div>

          <div className="md:col-span-5" data-reveal="clip">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-line bg-card">
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(94,98,87,0.4),transparent_62%)]"
                aria-hidden="true"
              />
              <div className="drift relative flex flex-col items-center text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-line-strong bg-elevated/60">
                  <Trophy size={30} strokeWidth={1.2} className="text-paper" />
                </span>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted">
                  <Award size={13} strokeWidth={1.6} />
                  24-hour sprint
                </span>
                <p className="mt-4 max-w-[16ch] font-display text-2xl leading-tight text-paper">
                  Vibe Visionary Award
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
