import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { isDesktopPointer, prefersReducedMotion } from "@/animations/transitions";

interface TiltProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

/**
 * Restrained pointer-driven 3D tilt. Disabled entirely for touch devices and
 * reduced-motion users — those users simply get the flat, fully readable panel.
 */
export function Tilt({ children, className, max = 5 }: TiltProps) {
  const enabled = useRef(typeof window !== "undefined" && isDesktopPointer() && !prefersReducedMotion());
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 140, damping: 20 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 140, damping: 20 });

  if (!enabled.current) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        px.set((event.clientX - rect.left) / rect.width - 0.5);
        py.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
