interface AbstractVisualProps {
  variant: "scanner" | "summarizer";
}

function Line({ w, dim = false }: { w: string; dim?: boolean }) {
  return <div className={`h-1.5 rounded-full ${dim ? "bg-white/[0.06]" : "bg-white/[0.12]"}`} style={{ width: w }} />;
}

function ScannerVisual() {
  return (
    <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl border border-line bg-[#0d0d0d]">
      <div className="relative h-44 w-36 rounded-lg border border-line bg-elevated/50 p-3">
        <div className="space-y-2">
          <Line w="70%" />
          <Line w="100%" dim />
          <Line w="88%" dim />
          <Line w="92%" dim />
          <Line w="55%" dim />
        </div>
        <div className="absolute left-2 top-12 h-8 w-24 rounded border border-paper/30" />
        <div className="absolute left-2 top-24 h-5 w-16 rounded border border-paper/20" />
        <div className="scanline absolute inset-x-0 top-0 h-px bg-paper/70 shadow-[0_0_18px_2px_rgba(245,243,239,0.35)]" />
      </div>
      <div className="ml-5 space-y-2">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">extract</p>
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded border border-line bg-elevated/40 px-2 py-1.5">
            <div className="h-1.5 w-20 rounded-full bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SummarizerVisual() {
  return (
    <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl border border-line bg-[#0d0d0d]">
      <div className="flex w-[86%] items-center gap-4">
        <div className="flex-1 space-y-2 rounded-lg border border-line bg-elevated/40 p-3">
          {["92%", "100%", "84%", "96%", "78%", "90%", "70%"].map((w, index) => (
            <Line key={index} w={w} dim={index > 0} />
          ))}
        </div>

        <svg width="34" height="24" viewBox="0 0 34 24" fill="none" aria-hidden="true" className="shrink-0">
          <path
            d="M1 12h28m0 0-6-6m6 6-6 6"
            stroke="rgba(245,243,239,0.4)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="w-28 shrink-0 space-y-2 rounded-lg border border-paper/20 bg-paper/[0.03] p-3">
          <Line w="100%" />
          <Line w="80%" />
          <Line w="60%" />
        </div>
      </div>
    </div>
  );
}

/** Original abstract SVG/CSS illustrations for the research panels. */
export function AbstractVisual({ variant }: AbstractVisualProps) {
  return variant === "scanner" ? <ScannerVisual /> : <SummarizerVisual />;
}
