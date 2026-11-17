interface SplitTextProps {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  id?: string;
  /** Accessible text — defaults to the joined lines. */
  label?: string;
}

/**
 * Renders each line inside an overflow-hidden mask and each word as an
 * animatable span. GSAP targets the inner `.word` elements.
 */
export function SplitText({ lines, as = "h2", className, id, label }: SplitTextProps) {
  const Tag = as as "h2";

  return (
    <Tag className={className} id={id} aria-label={label ?? lines.join(" ")}>
      {lines.map((line, lineIndex) => {
        const words = line.split(" ");
        return (
          <span className="mask-line" key={`${line}-${lineIndex}`} aria-hidden="true">
            {words.map((word, wordIndex) => (
              <span className="word-wrap" key={`${word}-${wordIndex}`}>
                <span className="word">{word}</span>
                {wordIndex < words.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}
