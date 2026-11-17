import { Heart, Play, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react";

/**
 * Original CSS/SVG mobile mockup for the Vibe music player.
 * No real app screenshots exist, so this is an honest stylised representation.
 */
export function PhoneMock() {
  const bars = [0.4, 0.7, 1, 0.55, 0.85, 0.35, 0.95, 0.6, 0.8, 0.45, 0.7, 0.5];

  return (
    <div className="relative mx-auto w-[210px] rounded-[2.6rem] border border-line bg-[#0c0c0c] p-2.5 shadow-[0_40px_90px_-45px_rgba(0,0,0,0.95)] sm:w-[248px]">
      <div className="absolute left-1/2 top-3.5 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/70" />
      <div className="relative overflow-hidden rounded-[2.1rem] bg-gradient-to-b from-[#1a1815] via-[#121110] to-[#0a0a0a] p-4 pt-7">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-muted">Now playing</span>
          <span className="h-4 w-4 rounded-full border border-line" />
        </div>

        <div className="mt-4 aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-accent/50 via-accent/20 to-[#0e0d0c]">
          <div className="flex h-full items-end gap-[3px] p-3" aria-hidden="true">
            {bars.map((height, index) => (
              <span
                key={index}
                className="eq-bar flex-1 rounded-full bg-paper/30"
                style={{ height: `${height * 40}%`, animationDelay: `${(index % 6) * 0.16}s` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="font-display text-lg leading-tight text-paper">Midnight Frequencies</p>
          <p className="mt-0.5 text-[0.62rem] tracking-wide text-muted">Vibe Sessions</p>
        </div>

        <div className="mt-4">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/5 rounded-full bg-paper/80" />
          </div>
          <div className="mt-1.5 flex justify-between font-mono text-[0.5rem] text-muted">
            <span>1:24</span>
            <span>3:48</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Shuffle size={14} strokeWidth={1.5} className="text-muted" />
          <SkipBack size={16} strokeWidth={1.5} className="text-paper" />
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink">
            <Play size={16} strokeWidth={1.5} className="translate-x-[1px] fill-ink" />
          </span>
          <SkipForward size={16} strokeWidth={1.5} className="text-paper" />
          <Repeat size={14} strokeWidth={1.5} className="text-muted" />
        </div>

        <div className="mt-4 flex items-center justify-between rounded-full border border-line px-3 py-2">
          <span className="flex items-center gap-1.5 text-[0.52rem] uppercase tracking-[0.16em] text-muted">
            <Heart size={11} strokeWidth={1.6} /> Gesture controls
          </span>
          <span className="font-mono text-[0.5rem] text-muted">swipe &#8594;</span>
        </div>

        <div className="mt-3 h-1 w-20 mx-auto rounded-full bg-white/25" />
      </div>
    </div>
  );
}
