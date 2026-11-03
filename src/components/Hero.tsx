import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import site from "@/data/site.json";
import athleteImg from "@/assets/hero-athlete-cutout.png";
import { HeroTypewriter } from "@/components/HeroTypewriter";
import { HeroVectorWordmark } from "@/components/HeroVectorWordmark";
import { StaggeredText } from "@/components/ui/staggered-text";

export function Hero() {
  const nameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!nameRef.current || !imgRef.current || !copyRef.current) return;
      const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      imgRef.current.style.transform = `translateY(${p * -22}%) scale(${1 - p * 0.08})`;
      imgRef.current.style.opacity = `${1 - p * 0.5}`;
      nameRef.current.style.opacity = `${0.22 + p * 0.78}`;
      copyRef.current.style.opacity = `${1 - p}`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative h-[190svh]">
      <section id="top" className="hero-section sticky top-0 flex h-svh flex-col overflow-hidden bg-background">
        <h1 className="sr-only">{site.hero.name}</h1>

        <div ref={nameRef} className="hero-wordmark-layer" style={{ opacity: 0.22 }} aria-hidden="true">
          <HeroVectorWordmark text={site.hero.name} />
        </div>

        <div className="hero-character-stage">
          <img
            ref={imgRef}
            src={athleteImg}
            alt=""
            width={1024}
            height={1536}
            className="hero-athlete-layer"
          />
          <div className="hero-ground-line" aria-hidden="true" />
        </div>

        <div
          ref={copyRef}
          className="hero-copy container-x relative z-20 grid shrink-0 gap-8 bg-background pb-8 pt-6 lg:mt-auto lg:bg-transparent lg:pb-14 lg:pt-32 lg:grid-cols-[1fr_auto] lg:items-end lg:pb-14"
        >
          <div className="max-w-md">
            <HeroTypewriter lines={site.hero.typewriterLines ?? [site.hero.punchline]} />
            <StaggeredText
              text={site.hero.subline}
              as="p"
              className="hero-sub mt-3 text-lg text-muted-foreground md:text-xl"
              segmentBy="words"
              direction="top"
              delay={35}
              blur={false}
              threshold={0.15}
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#packages" className="btn btn-primary">
                Start now
              </a>
              <a href="#shop" className="btn btn-secondary">
                Shop gear
              </a>
            </div>
          </div>
          <a
            href="#packages"
            className="scroll-cue hidden items-center gap-2 text-muted-foreground md:flex"
            aria-label="Scroll to packages"
          >
            Scroll <ArrowDown className="size-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
