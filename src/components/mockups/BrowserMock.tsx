interface BrowserMockProps {
  variant: "event" | "portfolio";
}

function Chrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-line bg-[#0c0c0c] px-4 py-3">
      <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a2a]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a2a]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a2a]" />
      <span className="ml-3 truncate rounded-full bg-elevated px-3 py-1 font-mono text-[0.6rem] tracking-wide text-muted">
        {url}
      </span>
    </div>
  );
}

function EventUI() {
  const categories = ["Technical", "Cultural", "Sports", "Workshops"];
  const cards = [
    { title: "Hack Sprint", meta: "24 hrs \u2022 Team of 4" },
    { title: "Code Relay", meta: "Online \u2022 Solo" },
    { title: "Design Jam", meta: "On campus \u2022 Team" },
  ];
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-sm bg-accent/70" />
          <span className="text-[0.62rem] font-medium tracking-wide text-paper/90">CAMPUS&nbsp;FEST</span>
        </div>
        <div className="hidden gap-3 sm:flex">
          {["Events", "Schedule", "Register"].map((item) => (
            <span key={item} className="text-[0.55rem] uppercase tracking-[0.18em] text-muted">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {categories.map((item, index) => (
          <span
            key={item}
            className={`rounded-full border px-2.5 py-1 text-[0.5rem] uppercase tracking-[0.14em] ${
              index === 0 ? "border-paper/40 text-paper" : "border-line text-muted"
            }`}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {cards.map((card, index) => (
          <div key={card.title} className="rounded-lg border border-line bg-elevated/60 p-2.5">
            <div
              className={`mb-2 h-8 rounded bg-gradient-to-br ${
                index === 0
                  ? "from-accent/40 to-transparent"
                  : index === 1
                    ? "from-paper/15 to-transparent"
                    : "from-white/10 to-transparent"
              }`}
            />
            <p className="text-[0.58rem] font-medium text-paper/90">{card.title}</p>
            <p className="mt-0.5 text-[0.48rem] text-muted">{card.meta}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto rounded-lg border border-line bg-elevated/40 p-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-1.5 w-28 rounded-full bg-white/10" />
            <div className="h-1.5 w-20 rounded-full bg-white/[0.07]" />
          </div>
          <span className="rounded-full bg-paper px-3 py-1.5 text-[0.48rem] font-medium uppercase tracking-[0.16em] text-ink">
            Register
          </span>
        </div>
      </div>
    </div>
  );
}

function PortfolioUI() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-display text-[0.7rem] text-paper">Vibin D.</span>
        <div className="flex gap-3">
          {["Work", "About", "Contact"].map((item) => (
            <span key={item} className="text-[0.5rem] uppercase tracking-[0.18em] text-muted">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-1 space-y-1.5">
        <p className="font-display text-[1.1rem] leading-[0.95] text-paper">Building digital</p>
        <p className="font-display text-[1.1rem] leading-[0.95] text-paper/85">experiences.</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className={`h-14 rounded-lg border border-line bg-gradient-to-br ${
              item === 1 ? "from-accent/30 to-transparent" : "from-white/[0.08] to-transparent"
            }`}
          />
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between rounded-lg border border-line bg-elevated/40 px-3 py-2">
        <div className="space-y-1.5">
          <div className="h-1.5 w-24 rounded-full bg-white/10" />
          <div className="h-1.5 w-16 rounded-full bg-white/[0.07]" />
        </div>
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-paper/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}

/** Original CSS browser preview — used because no real project screenshots exist. */
export function BrowserMock({ variant }: BrowserMockProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-line bg-[#0d0d0d] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
      <Chrome url={variant === "event" ? "college-event.edu/events" : "vibin.dev"} />
      <div className="aspect-[16/10] p-5">{variant === "event" ? <EventUI /> : <PortfolioUI />}</div>
    </div>
  );
}
