import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import site from "@/data/site.json";
import fallbackImg from "@/assets/p-dumbbells.jpg";

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    // Load three.js only in the browser, after hydration.
    import("./hero3d")
      .then(({ mountHero3D }) => {
        if (cancelled || !host.current || !section.current) return;
        try { cleanup = mountHero3D(host.current, section.current); }
        catch { setFallback(true); }
      })
      .catch(() => setFallback(true));
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <section ref={section} id="top" className="relative flex min-h-svh flex-col overflow-hidden bg-background">
      <h1 className="display pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-[60%] text-center" aria-label={site.hero.headline.join(" ")}>
        {site.hero.headline.map((w, i) => (
          <span key={w} className="word block sm:mx-[0.04em] sm:inline-block" aria-hidden="true">
            <span style={{ animationDelay: `${0.15 + i * 0.14}s` }}>{w}</span>
          </span>
        ))}
      </h1>

      <div ref={host} className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        {fallback && (
          <img src={fallbackImg} alt="" width={816} height={816} className="absolute left-1/2 top-1/2 w-[min(70vw,520px)] -translate-x-1/2 -translate-y-[58%]" />
        )}
      </div>

      <div className="container-x relative z-20 mt-auto grid gap-8 pb-10 pt-32 md:grid-cols-[1fr_auto] md:items-end md:pb-14">
        <div className="max-w-md">
          <p className="text-lg text-muted-foreground md:text-xl">{site.hero.subline}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#packages" className="btn btn-primary">Start now</a>
            <a href="#shop" className="btn btn-secondary">Shop gear</a>
          </div>
        </div>
        <a href="#packages" className="scroll-cue hidden items-center gap-2 text-muted-foreground md:flex" aria-label="Scroll to packages">
          Scroll <ArrowDown className="size-4" />
        </a>
      </div>
    </section>
  );
}
