import { ArrowUp, Mail } from "lucide-react";
import { GithubMark, LinkedinMark } from "@/components/BrandIcons";
import { navItems, identity } from "@/data/site";
import { contact } from "@/data/contact";
import { scrollToTop, scrollToTarget } from "@/lib/smoothScroll";
import { useReveal } from "@/hooks/useReveal";

export function Footer() {
  const ref = useReveal<HTMLElement>();
  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="border-t border-line">
      <div className="shell py-14 md:py-20">
        <div className="flex flex-col gap-14 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md" data-reveal="up">
            <p className="font-display text-[clamp(2rem,4vw,3rem)] leading-none text-paper">{identity.name}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Exploring intelligent systems, mobile applications, and immersive digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            <div>
              <p className="eyebrow mb-5">Navigate</p>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => scrollToTarget(item.href)}
                      className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-paper"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-5">Elsewhere</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-paper"
                  >
                    <GithubMark size={13} /> GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-paper"
                  >
                    <LinkedinMark size={13} /> LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-paper"
                  >
                    <Mail size={13} strokeWidth={1.6} /> Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-muted">
            © {year} {identity.name} — All rights reserved
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 self-start font-mono text-[0.64rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-paper sm:self-auto"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:border-paper group-hover:-translate-y-0.5">
              <ArrowUp size={13} strokeWidth={1.6} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
