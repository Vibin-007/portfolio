import NumberFlow from "@number-flow/react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [progressPercent, setProgressPercent] = useState(0);

  const clampedProgress = useTransform(scrollYProgress, (value) =>
    Math.min(Math.max(value, 0), 1),
  );
  const progressAsPercent = useTransform(clampedProgress, (value) =>
    Math.round(value * 100),
  );

  useMotionValueEvent(progressAsPercent, "change", (value) => {
    setProgressPercent(value);
  });

  const svgRadius = 18;
  const circumference = 2 * Math.PI * svgRadius;

  return (
    <motion.div
      className={cn(
        "group fixed top-[30px] left-8 cursor-pointer items-center gap-1 flex z-[200]"
      )}
    >
      <div 
        className="flex size-11 items-center justify-center rounded-full border border-white/10 hover:bg-white/10 transition-colors"
        style={{
          background: 'linear-gradient(180deg, rgba(14, 14, 22, 0.28), rgba(14, 14, 22, 0.45))',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -8px 20px rgba(255, 255, 255, 0.06), inset 0 0 0 1px rgba(255, 255, 255, 0.13)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)'
        }}
      >
        <svg
          className={cn("size-10 text-white")}
          viewBox="0 0 48 48"
          role="presentation"
        >
          <circle
            cx="24"
            cy="24"
            r={svgRadius}
            stroke="currentColor"
            strokeWidth="3"
            className={cn("opacity-20")}
            fill="none"
          />
          <motion.circle
            cx="24"
            cy="24"
            r={svgRadius}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${circumference}`}
            style={{
              pathLength: clampedProgress,
              rotate: -90,
              transformOrigin: "50% 50%",
            }}
          />
        </svg>
      </div>
      <NumberFlow
        value={progressPercent}
        className={cn(
          "text-white/50 absolute left-full ml-2 top-1/2 -translate-y-1/2 flex h-8 items-center justify-center px-2 text-xs font-medium tabular-nums opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        )}
        suffix="%"
      />
    </motion.div>
  );
};
