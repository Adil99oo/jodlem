import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import site from "@/data/site.json";
import athleteImg from "@/assets/hero-athlete-cutout.png";

export function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!nameRef.current || !imgRef.current || !copyRef.current) return;
      const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      // The hero stays pinned for one viewport of scrolling: the athlete drifts
      // up and recedes while the name sharpens into view behind him.
      imgRef.current.style.transform = `translateY(${p * -22}%) scale(${1 - p * 0.08})`;
      imgRef.current.style.opacity = `${1 - p * 0.5}`;
      nameRef.current.style.opacity = `${0.22 + p * 0.78}`;
      nameRef.current.style.letterSpacing = `${p * 0.05}em`;
      copyRef.current.style.opacity = `${1 - p}`;
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
    <div className="relative h-[190svh]">
      <section id="top" className="sticky top-0 flex h-svh flex-col overflow-hidden bg-background">
        <h1
          ref={nameRef}
          className="display pointer-events-none absolute inset-x-0 top-[46%] z-0 -translate-y-1/2 text-center text-foreground text-[clamp(7rem,23vw,23rem)] will-change-transform md:top-[38%]"
          style={{ opacity: 0.22 }}
          aria-label={site.hero.name}
        >
          <span className="word block" aria-hidden="true">
            <span>{site.hero.name}</span>
          </span>
        </h1>

        <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 -translate-x-1/2 md:left-auto md:right-[6vw] md:translate-x-0" aria-hidden="true">
          <img
            ref={imgRef}
            src={athleteImg}
            alt=""
            width={1024}
            height={1536}
            className="h-[72svh] w-auto object-contain object-bottom will-change-transform md:h-[88svh]"
          />
        </div>

        <div ref={copyRef} className="container-x relative z-20 mt-auto grid gap-8 pb-10 pt-32 md:grid-cols-[1fr_auto] md:items-end md:pb-14">
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
    </div>
  );
}
