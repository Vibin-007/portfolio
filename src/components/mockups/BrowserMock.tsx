interface BrowserMockProps {
  variant: "event" | "portfolio" | "campnotes" | "queueless";
  image?: string;
  alt?: string;
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

function CampNotesUI() {
  const tabs = ["All Notes", "Question Banks", "Lab Manuals", "Syllabus"];
  const notes = [
    { title: "Distributed Systems — Unit 4", meta: "CS501 • Prof. Rao", size: "3.4 MB", badge: "Verified" },
    { title: "Machine Learning & Neural Nets", meta: "AI602 • Final Review", size: "5.1 MB", badge: "Top Rated" },
    { title: "Database Systems & Indexing", meta: "IT404 • Semester Exam", size: "2.8 MB", badge: "Verified" },
  ];

  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded bg-accent/60 font-mono text-[0.55rem] font-bold text-paper">
            CN
          </span>
          <span className="font-mono text-[0.64rem] font-medium tracking-wide text-paper">CampNotes</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-line bg-elevated/80 px-2.5 py-0.5 text-[0.52rem] text-muted">
          <span>Search resources...</span>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-hidden">
        {tabs.map((tab, idx) => (
          <span
            key={tab}
            className={`rounded-full border px-2 py-0.5 text-[0.48rem] uppercase tracking-wider ${
              idx === 0 ? "border-paper/40 bg-white/5 text-paper" : "border-line text-muted"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        {notes.map((note) => (
          <div
            key={note.title}
            className="flex items-center justify-between rounded-lg border border-line bg-elevated/60 px-2.5 py-1.5"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-[0.58rem] font-medium text-paper">{note.title}</p>
                <span className="rounded bg-accent/30 px-1 py-0.5 text-[0.42rem] uppercase tracking-wider text-paper/80">
                  {note.badge}
                </span>
              </div>
              <p className="text-[0.48rem] text-muted">
                {note.meta} • {note.size}
              </p>
            </div>
            <span className="shrink-0 rounded border border-line px-2 py-0.5 text-[0.46rem] text-muted">
              Download
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between rounded-lg border border-line bg-elevated/40 px-3 py-1.5 text-[0.48rem] text-muted">
        <span>PostgreSQL Auth • Role-based access control</span>
        <span className="font-medium text-paper">Upload Resource</span>
      </div>
    </div>
  );
}

function QueueLessUI() {
  const waitingTokens = [
    { num: "#105", type: "Priority", wait: "5 min" },
    { num: "#106", type: "General", wait: "10 min" },
    { num: "#107", type: "Support", wait: "15 min" },
  ];

  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="font-mono text-[0.64rem] font-medium tracking-wide text-paper">QueueLess</span>
          <span className="text-[0.5rem] uppercase tracking-wider text-muted">• Counter 01</span>
        </div>
        <span className="rounded-full border border-line bg-elevated/80 px-2 py-0.5 text-[0.48rem] uppercase tracking-wider text-muted">
          Live Polling
        </span>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-paper/20 bg-gradient-to-r from-accent/20 via-elevated to-elevated p-2.5">
        <div>
          <span className="text-[0.48rem] font-mono uppercase tracking-[0.2em] text-muted">Now Serving</span>
          <p className="font-display text-[1.3rem] leading-none text-paper mt-0.5">#104</p>
          <span className="text-[0.46rem] text-muted">Token Category: Priority</span>
        </div>
        <div className="text-right">
          <span className="rounded-full bg-paper px-2.5 py-1 font-mono text-[0.5rem] font-semibold uppercase tracking-wider text-ink">
            Serving
          </span>
          <p className="mt-1 text-[0.46rem] text-muted">Est. wait: ~5 min</p>
        </div>
      </div>

      <div>
        <p className="mb-1 text-[0.46rem] uppercase tracking-widest text-muted">Up Next in Line</p>
        <div className="grid grid-cols-3 gap-1.5">
          {waitingTokens.map((t) => (
            <div key={t.num} className="rounded-md border border-line bg-elevated/60 p-1.5 text-center">
              <p className="font-display text-[0.75rem] text-paper">{t.num}</p>
              <p className="text-[0.44rem] text-muted">{t.type}</p>
              <p className="text-[0.42rem] text-accent mt-0.5">~{t.wait}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between rounded-lg border border-line bg-elevated/40 px-3 py-1.5">
        <span className="text-[0.46rem] text-muted">Staff Controls</span>
        <div className="flex items-center gap-1.5">
          <span className="rounded bg-paper px-2 py-0.5 text-[0.46rem] font-medium text-ink">
            Call Next (#105)
          </span>
          <span className="rounded border border-line px-1.5 py-0.5 text-[0.44rem] text-muted">
            Reset
          </span>
        </div>
      </div>
    </div>
  );
}

/** Browser mockup preview with support for real screenshots and responsive CSS mockups. */
export function BrowserMock({ variant, image, alt }: BrowserMockProps) {
  const screenshot = image || (variant === "event" ? "/images/Event.png" : undefined);

  const getUrl = () => {
    switch (variant) {
      case "event":
        return "rgf2025.edu/admin/dashboard";
      case "campnotes":
        return "campnotes.edu/resources";
      case "queueless":
        return "queueless.app/live";
      default:
        return "vibin.dev";
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-line bg-[#0d0d0d] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
      <Chrome url={getUrl()} />
      <div className="aspect-[16/10] overflow-hidden bg-ink">
        {screenshot ? (
          <img
            src={screenshot}
            alt={alt ?? "Project preview"}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="h-full p-4 sm:p-5">
            {variant === "event" && <EventUI />}
            {variant === "campnotes" && <CampNotesUI />}
            {variant === "queueless" && <QueueLessUI />}
            {variant === "portfolio" && <PortfolioUI />}
          </div>
        )}
      </div>
    </div>
  );
}
