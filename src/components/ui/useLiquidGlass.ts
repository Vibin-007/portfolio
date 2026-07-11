import { useEffect, useRef } from "react";
import { liquidGlass, type LiquidGlassOptions, type LiquidGlassInstance } from "./liquidGlass";

/**
 * React hook that applies the liquid-glass refraction effect to a DOM node.
 *
 * @param elementRef - ref to the glass element
 * @param options - same options as the vanilla liquidGlass() call
 * @returns a ref holding the glass instance, in case you need to call .refresh()
 */
export function useLiquidGlass(
  elementRef: React.RefObject<HTMLElement | null>,
  options?: LiquidGlassOptions
) {
  const glassRef = useRef<LiquidGlassInstance | null>(null);

  // Stringify so the effect only re-runs when option *values* actually change
  const optionsKey = JSON.stringify(options || {});

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const instance = liquidGlass(el, options);
    glassRef.current = instance;

    return () => {
      instance.destroy();
      glassRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, optionsKey]);

  return glassRef;
}
