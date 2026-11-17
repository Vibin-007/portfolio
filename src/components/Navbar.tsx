import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { gsap } from "@/animations/gsap";
import { navItems, identity } from "@/data/site";
import { contact } from "@/data/contact";
import { lockScroll, scrollToTarget, scrollToTop } from "@/lib/smoothScroll";

const socials = [
  { label: "GitHub", href: contact.github },
  { label: "LinkedIn", href: contact.linkedin },
  { label: "Email", href: `mailto:${contact.email}` },
];

export function Navbar({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ready || !headerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, { yPercent: -140, autoAlpha: 0, duration: 1, ease: "expo.out", delay: 0.15 });
    });
    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[120] -translate-y-24 rounded-full border border-line-strong bg-ink px-5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-paper transition-transform duration-300 focus-visible:translate-y-0"
        onClick={(event) => {
          event.preventDefault();
          scrollToTarget("#main");
        }}
      >
        Skip to content
      </a>

      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 border-b transition-all duration-500 ${
            scrolled ? "border-line bg-ink/80 backdrop-blur-xl" : "border-transparent bg-transparent"
          }`}
        />
        <nav className="shell flex items-center justify-between py-4 md:py-5" aria-label="Primary">
          <button
            type="button"
            onClick={scrollToTop}
            className="font-mono text-[0.72rem] tracking-[0.3em] uppercase text-paper transition-opacity hover:opacity-70"
          >
            {identity.logo}
          </button>

          <ul className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => go(item.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative font-mono text-[0.68rem] uppercase tracking-[0.22em] transition-colors duration-300 ${
                      isActive ? "text-paper" : "text-muted hover:text-paper"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1.5 left-0 h-px bg-paper transition-all duration-500 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go("#contact")}
              className="btn hidden md:inline-flex"
            >
              Let&apos;s talk
              <ArrowUpRight size={15} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-line-strong md:hidden"
              aria-label="Open navigation menu"
              aria-expanded={open}
            >
              <Menu size={18} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-ink px-[var(--gutter)] py-6 md:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.72rem] tracking-[0.3em] uppercase text-paper">
                {identity.logo}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper"
                aria-label="Close navigation menu"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1" aria-label="Mobile">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  type="button"
                  onClick={() => go(item.href)}
                  className="flex items-baseline gap-4 py-3 text-left"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-mono text-[0.62rem] tracking-[0.2em] text-muted">
                    0{index + 1}
                  </span>
                  <span className="font-display text-[2.6rem] leading-none text-paper">{item.label}</span>
                </motion.button>
              ))}
            </nav>

            <div className="flex items-center justify-between border-t border-line pt-5">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
