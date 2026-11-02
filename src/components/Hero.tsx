import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import site from "@/data/site.json";
import athleteImg from "@/assets/hero-athlete-cutout.png";

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = section.current;
      if (!el || !nameRef.current || !imgRef.current) return;
      const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      // The athlete drifts up and recedes; the name stays put and sharpens into view.
      imgRef.current.style.transform = `translateY(${p * -16}%) scale(${1 - p * 0.07})`;
      imgRef.current.style.opacity = `${1 - p * 0.45}`;
      nameRef.current.style.opacity = `${0.22 + p * 0.78}`;
      nameRef.current.style.letterSpacing = `${p * 0.04}em`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={section} id="top" className="relative flex min-h-svh flex-col overflow-hidden bg-background">
      <h1
        ref={nameRef}
        className="display pointer-events-none absolute inset-x-0 top-[38%] z-0 -translate-y-1/2 text-center text-foreground text-[clamp(7rem,23vw,23rem)]"
        style={{ opacity: 0.22 }}
        aria-label={site.hero.name}
      >
        <span className="word block" aria-hidden="true">
          <span>{site.hero.name}</span>
        </span>
      </h1>

      <img
        ref={imgRef}
        src={athleteImg}
        alt="Athlete training with full effort"
        width={1024}
        height={1536}
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[72svh] w-auto -translate-x-1/2 object-contain object-bottom md:left-auto md:right-[6vw] md:h-[88svh] md:translate-x-0"
      />

      <div className="container-x relative z-20 mt-auto grid gap-8 pb-10 pt-32 md:grid-cols-[1fr_auto] md:items-end md:pb-14">
        <div className="max-w-md">
          <p className="text-2xl font-black uppercase leading-tight md:text-3xl">{site.hero.punchline}</p>
          <p className="mt-3 text-lg text-muted-foreground md:text-xl">{site.hero.subline}</p>
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
