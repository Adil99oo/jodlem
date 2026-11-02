import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import site from "@/data/site.json";
import { useReveal } from "@/lib/motion";

export function Testimonials() {
  const ref = useReveal<HTMLDivElement>();
  const items = site.testimonials;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (d: number) => setI((n) => (n + d + items.length) % items.length);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [paused, i]);

  const t = items[i];
  return (
    <section className="section section-surface" aria-roledescription="carousel" aria-label="What members say">
      <div
        ref={ref}
        className="reveal container-x"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <figure key={i} className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500" aria-live="polite">
          <blockquote className="text-[length:clamp(1.6rem,3.6vw,3rem)] font-bold leading-tight">"{t.quote}"</blockquote>
          <figcaption className="mt-8">
            <span className="font-bold">{t.name}</span>
            <span className="text-muted-foreground"> · {t.role}</span>
          </figcaption>
        </figure>
        <div className="mt-12 flex items-center gap-3">
          <button className="btn btn-on-surface btn-icon" onClick={() => go(-1)} aria-label="Previous testimonial"><ArrowLeft className="size-5" /></button>
          <button className="btn btn-on-surface btn-icon" onClick={() => go(1)} aria-label="Next testimonial"><ArrowRight className="size-5" /></button>
          <span className="ml-3 text-muted-foreground" aria-hidden="true">{i + 1} / {items.length}</span>
        </div>
      </div>
    </section>
  );
}
