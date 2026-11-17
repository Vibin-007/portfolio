import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Mail, Phone } from "lucide-react";
import { gsap } from "@/animations/gsap";
import { setupContactFinale } from "@/animations/scrollScenes";
import { GithubMark, LinkedinMark } from "@/components/BrandIcons";
import { contact, contactChannels } from "@/data/contact";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/SectionHeading";

const icons = {
  email: Mail,
  phone: Phone,
  github: GithubMark,
  linkedin: LinkedinMark,
} as const;

export function Contact() {
  const ref = useReveal<HTMLElement>();
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      setupContactFinale(el);
    }, el);
    return () => ctx.revert();
  }, [ref]);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const copy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(null), 2200);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section id="contact" ref={ref} className="section border-t border-line">
      <div className="shell">
        <SectionHeading eyebrow={contact.eyebrow} lines={contact.headlineLines}>
          <p className="body-lg mt-8 max-w-xl" data-reveal="up">
            {contact.supporting}
          </p>
        </SectionHeading>

        <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5" data-reveal="up">
            <a
              href={`mailto:${contact.email}`}
              className="ulink break-all font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight text-paper"
            >
              {contact.email}
            </a>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Prefer a direct line? Call or message — I&apos;m based in Tamil Nadu, India.
            </p>
          </div>

          <ul className="md:col-span-7" data-reveal="stagger">
            {contactChannels.map((channel) => {
              const Icon = icons[channel.id as keyof typeof icons] ?? Mail;
              const isCopied = copied === channel.id;
              return (
                <li key={channel.id} className="group flex items-center justify-between gap-4 border-t border-line py-6 last:border-b">
                  <div className="flex min-w-0 items-center gap-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-paper/80 transition-colors duration-500 group-hover:border-line-strong group-hover:text-paper">
                      <Icon size={17} strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0">
                      <p className="eyebrow">{channel.label}</p>
                      {channel.href ? (
                        <a
                          href={channel.href}
                          target={channel.external ? "_blank" : undefined}
                          rel={channel.external ? "noreferrer noopener" : undefined}
                          className="ulink mt-1 block truncate text-[1.02rem] text-paper"
                        >
                          {channel.value}
                          {channel.external ? (
                            <ArrowUpRight size={14} strokeWidth={1.6} className="shrink-0" />
                          ) : null}
                        </a>
                      ) : (
                        <p className="mt-1 truncate text-[1.02rem] text-paper">{channel.value}</p>
                      )}
                    </div>
                  </div>

                  {channel.copyValue ? (
                    <button
                      type="button"
                      onClick={() => copy(channel.id, channel.copyValue as string)}
                      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-3.5 py-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted transition-colors duration-300 hover:border-line-strong hover:text-paper"
                      aria-label={`Copy ${channel.label.toLowerCase()}`}
                    >
                      {isCopied ? <Check size={12} strokeWidth={2} /> : <Copy size={12} strokeWidth={1.6} />}
                      {isCopied ? "Copied" : "Copy"}
                    </button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-20 overflow-hidden border-t border-line pt-10" aria-hidden="true">
          <p
            data-contact-mark
            className="font-display leading-[0.85] text-paper/[0.06]"
            style={{ fontSize: "clamp(3rem, 15vw, 14rem)" }}
          >
            VIBIN D.
          </p>
        </div>
      </div>
    </section>
  );
}
