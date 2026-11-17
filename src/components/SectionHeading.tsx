import type { ReactNode } from "react";
import { SplitText } from "./SplitText";

interface SectionHeadingProps {
  eyebrow: string;
  lines: string[];
  id?: string;
  children?: ReactNode;
  className?: string;
  action?: ReactNode;
}

/**
 * Consistent editorial section header: mono eyebrow, oversized serif headline,
 * optional supporting content and a trailing action.
 */
export function SectionHeading({ eyebrow, lines, id, children, className = "", action }: SectionHeadingProps) {
  return (
    <header className={`flex flex-col gap-8 ${className}`}>
      <div className="flex items-center justify-between gap-6">
        <p className="eyebrow" data-reveal="up">
          {eyebrow}
        </p>
        <span className="hidden h-px flex-1 bg-line sm:block" aria-hidden="true" />
        {action}
      </div>

      <div data-reveal="words">
        <SplitText as="h2" id={id} lines={lines} className="headline max-w-[16ch]" />
      </div>

      {children}
    </header>
  );
}
