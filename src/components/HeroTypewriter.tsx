"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const TYPE_MS = 52;
const DELETE_MS = 32;
const PAUSE_TYPED_MS = 2400;
const PAUSE_DELETED_MS = 360;

type HeroTypewriterProps = {
  lines: string[];
  className?: string;
};

export function HeroTypewriter({ lines, className }: HeroTypewriterProps) {
  const phrases = useMemo(() => lines.filter((line) => line.trim().length > 0), [lines]);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (phrases.length === 0) return undefined;
    if (reducedMotion) {
      setText(phrases[index % phrases.length] ?? "");
      const t = setInterval(() => setIndex((i) => (i + 1) % phrases.length), 4000);
      return () => clearInterval(t);
    }

    const full = phrases[index % phrases.length] ?? "";
    let timer = 0;

    if (!deleting && text === full) {
      timer = window.setTimeout(() => setDeleting(true), PAUSE_TYPED_MS);
    } else if (deleting && text.length === 0) {
      timer = window.setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      }, PAUSE_DELETED_MS);
    } else {
      timer = window.setTimeout(() => {
        setText((current) => {
          if (deleting) return full.slice(0, Math.max(0, current.length - 1));
          return full.slice(0, current.length + 1);
        });
      }, deleting ? DELETE_MS : TYPE_MS);
    }

    return () => window.clearTimeout(timer);
  }, [text, deleting, index, phrases, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    setText("");
    setDeleting(false);
  }, [index, reducedMotion]);

  const display = reducedMotion ? (phrases[index] ?? "") : text;
  const liveLabel = phrases[index] ?? display;

  if (phrases.length === 0) return null;

  return (
    <p
      className={cn(
        "hero-punch hero-typewriter text-[clamp(1.05rem,4.2vw,1.35rem)] font-black uppercase leading-snug text-foreground sm:text-2xl md:text-3xl",
        className,
      )}
    >
      <span className="hero-typewriter__line" aria-hidden="true">
        {display}
      </span>
      <span className="hero-typewriter__cursor" aria-hidden="true" />
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {liveLabel}
      </span>
    </p>
  );
}
