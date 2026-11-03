import {
  motion,
  useInView,
  type Easing,
  type MotionStyle,
  type TargetAndTransition,
  type VariantLabels,
} from "motion/react";
import { useMemo, useRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type TextTag = HeadingTag | "p" | "span";

export type StaggeredTextProps = {
  text: string;
  className?: string;
  as?: TextTag;
  segmentBy?: "chars" | "words" | "lines";
  separator?: string;
  delay?: number;
  duration?: number;
  easing?: Easing | Easing[];
  threshold?: number;
  rootMargin?: string;
  direction?: "top" | "bottom" | "left" | "right";
  blur?: boolean;
  staggerDirection?: "forward" | "reverse" | "center";
  respectReducedMotion?: boolean;
  exitOnScrollOut?: boolean;
  from?: MotionStyle;
  to?: MotionStyle | MotionStyle[];
  onAnimationComplete?: () => void;
  onExitComplete?: () => void;
};

const OFFSET: Record<NonNullable<StaggeredTextProps["direction"]>, { x: number; y: number }> = {
  top: { x: 0, y: "1.1em" as unknown as number },
  bottom: { x: 0, y: "-1.1em" as unknown as number },
  left: { x: "0.35em" as unknown as number, y: 0 },
  right: { x: "-0.35em" as unknown as number, y: 0 },
};

function splitSegments(text: string, segmentBy: StaggeredTextProps["segmentBy"], separator?: string) {
  const lines = separator ? text.split(separator) : [text];
  const out: string[] = [];
  for (const line of lines) {
    if (segmentBy === "lines") {
      out.push(line);
      continue;
    }
    if (segmentBy === "chars") {
      out.push(...[...line]);
      continue;
    }
    const words = line.trim() ? line.match(/\S+|\s+/g) ?? [] : [];
    for (const w of words) out.push(w);
  }
  return out.filter((s) => s.length > 0);
}

function staggerIndex(index: number, total: number, mode: StaggeredTextProps["staggerDirection"]) {
  if (mode === "reverse") return total - 1 - index;
  if (mode === "center") {
    const mid = (total - 1) / 2;
    return Math.round(Math.abs(index - mid));
  }
  return index;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function StaggeredText({
  text,
  className,
  as: Tag = "p",
  segmentBy = "words",
  separator,
  delay = 80,
  duration = 0.6,
  easing = [0.22, 1, 0.36, 1],
  threshold = 0.1,
  rootMargin = "0px",
  direction = "top",
  blur = true,
  staggerDirection = "forward",
  respectReducedMotion = true,
  exitOnScrollOut = false,
  from,
  to,
  onAnimationComplete,
}: StaggeredTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: threshold, margin: rootMargin, once: !exitOnScrollOut });
  const reduced = respectReducedMotion && prefersReducedMotion();

  const segments = useMemo(() => splitSegments(text, segmentBy, separator), [text, segmentBy, separator]);
  const offset = OFFSET[direction];
  const MotionTag = motion.create(Tag as ElementType);

  const defaultHidden: TargetAndTransition = {
    opacity: 0,
    x: offset.x,
    y: offset.y,
    filter: blur ? "blur(10px)" : "blur(0px)",
  };
  const defaultVisible: TargetAndTransition = {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
  };

  const hidden = from ?? defaultHidden;
  const visible = to ?? defaultVisible;

  if (reduced) {
    return (
      <Tag ref={ref as never} className={className}>
        {text}
      </Tag>
    );
  }

  let completed = 0;
  const onSegmentDone = () => {
    completed += 1;
    if (completed >= segments.length) onAnimationComplete?.();
  };

  return (
    <MotionTag ref={ref} className={cn(className)} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className={segmentBy === "lines" ? "flex flex-col" : "inline"}>
        {segments.map((segment, index) => {
          const isWhitespace = /^\s+$/.test(segment);
          if (isWhitespace) {
            return <span key={`ws-${index}`}>{segment}</span>;
          }
          const order = staggerIndex(index, segments.length, staggerDirection);
          const animate: boolean | TargetAndTransition | VariantLabels = inView ? (visible as TargetAndTransition) : (hidden as TargetAndTransition);
          return (
            <motion.span
              key={`${segment}-${index}`}
              className={cn(
                segmentBy === "lines" ? "block" : "inline-block",
                segmentBy === "words" && index < segments.length - 1 && !/^\s+$/.test(segments[index + 1] ?? "")
                  ? "mr-[0.28em]"
                  : undefined,
              )}
              initial={hidden}
              animate={animate}
              transition={{
                duration,
                delay: (order * delay) / 1000,
                ease: easing,
              }}
              onAnimationComplete={onSegmentDone}
            >
              {segment}
            </motion.span>
          );
        })}
      </span>
    </MotionTag>
  );
}

export default StaggeredText;
