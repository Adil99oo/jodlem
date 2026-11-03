import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import site from "@/data/site.json";
import { useReveal } from "@/lib/motion";
import { SiteGlassShell } from "@/components/ui/site-glass-shell";
import { StaggeredText } from "@/components/ui/staggered-text";

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
  if (!t) return null;
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
        <StaggeredText
          text="What members say"
          as="h2"
          className="h2 mb-10 max-w-xl"
          segmentBy="words"
          direction="top"
          delay={50}
        />
        <SiteGlassShell
          key={i}
          variant="card"
          radius={20}
          className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 rounded-2xl duration-500"
          contentClassName="p-6 sm:p-10"
          aria-live="polite"
        >
          <figure>
            <blockquote className="text-[length:clamp(1.6rem,3.6vw,3rem)] font-bold leading-tight">"{t.quote}"</blockquote>
            <figcaption className="mt-8">
              <span className="font-bold">{t.name}</span>
              <span className="text-muted-foreground"> · {t.role}</span>
            </figcaption>
          </figure>
        </SiteGlassShell>
        <div className="mt-12 flex items-center gap-3">
          <button className="btn btn-on-surface btn-icon" onClick={() => go(-1)} aria-label="Previous testimonial"><ArrowLeft className="size-5" /></button>
          <button className="btn btn-on-surface btn-icon" onClick={() => go(1)} aria-label="Next testimonial"><ArrowRight className="size-5" /></button>
          <span className="ml-3 text-muted-foreground" aria-hidden="true">{i + 1} / {items.length}</span>
        </div>
      </div>
    </section>
  );
}
