"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import VectorWordmark from "@/components/ui/vector-wordmark";

const REF_WIDTH = 1200;
/** Visible wordmark scale vs fit-to-box baseline (hero brief: 1.3×). */
const HERO_WORDMARK_SIZE_SCALE = 1.3;
function horizontalInset(viewportWidth: number) {
  if (viewportWidth < 640) return 18;
  if (viewportWidth < 1024) return 18;
  return 28;
}

function readThemeRgb(cssVar: string, fallback: string) {
  if (typeof document === "undefined") return fallback;
  const probe = document.createElement("span");
  probe.style.color = `var(${cssVar})`;
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  document.body.removeChild(probe);
  return resolved && resolved !== "rgba(0, 0, 0, 0)" ? resolved : fallback;
}

function measureWordWidth(
  text: string,
  drawFontPx: number,
  letterSpacing: string,
  family: string,
  weight: number,
) {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return drawFontPx * text.length;
  ctx.font = `${weight} ${drawFontPx}px ${family}`;
  try {
    if ("letterSpacing" in ctx) {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = letterSpacing;
    }
  } catch {
    /* unsupported */
  }
  const m = ctx.measureText(text);
  const pad = drawFontPx * 0.24;
  return m.width + pad;
}

/** fontSpec.size at REF_WIDTH so the baked word fits `availCssPx` at current host width */
function fitFontSpecSize(
  hostWidth: number,
  hostHeight: number,
  text: string,
  letterSpacing: string,
  family: string,
  weight: number,
): number {
  const inset = horizontalInset(hostWidth);
  const widthFill = hostWidth < 640 ? 0.9 : 0.96;
  const availW = Math.max(120, (hostWidth - inset * 2) * widthFill);
  const availH = Math.max(72, hostHeight * 0.88);
  let lo = 60;
  let hi = 640;
  for (let i = 0; i < 16; i += 1) {
    const spec = (lo + hi) / 2;
    const drawPx = spec * (hostWidth / REF_WIDTH);
    const w = measureWordWidth(text, drawPx, letterSpacing, family, weight);
    const h = drawPx * 1.06;
    if (w > availW || h > availH) hi = spec;
    else lo = spec;
  }
  const margin = hostWidth < 640 ? 0.94 : 0.98;
  return Math.floor(lo * margin * HERO_WORDMARK_SIZE_SCALE);
}

type HeroVectorWordmarkProps = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
};

export function HeroVectorWordmark({ text, className, style }: HeroVectorWordmarkProps) {
  const hostWrapRef = useRef<HTMLDivElement>(null);
  const [fontSizePx, setFontSizePx] = useState(280);

  const [colors, setColors] = useState({
    text: "rgb(247, 247, 247)",
    shade: "rgb(120, 120, 120)",
    accent: "rgba(196, 255, 69, 0.42)",
  });

  const letterSpacing = useMemo(() => {
    const chars = text.trim().length;
    if (chars <= 6) return "0.04em";
    if (chars <= 8) return "0.03em";
    return "0.02em";
  }, [text]);

  const fontFamily = '"Archivo", ui-sans-serif, system-ui, sans-serif';
  const fontWeight = 900;

  useEffect(() => {
    const fit = () => {
      const host = hostWrapRef.current?.parentElement;
      if (!host) return;
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (w < 1 || h < 1) return;
      setFontSizePx(
        fitFontSpecSize(w, h, text.trim(), letterSpacing, fontFamily, fontWeight),
      );
    };

    fit();
    const ro = new ResizeObserver(fit);
    const host = hostWrapRef.current?.parentElement;
    if (host) ro.observe(host);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [text, letterSpacing]);

  useEffect(() => {
    const sync = () => {
      const fg = readThemeRgb("--foreground", "rgb(247, 247, 247)");
      const muted = readThemeRgb("--muted-foreground", "rgb(120, 120, 120)");
      const acc = readThemeRgb("--accent", "rgb(196, 255, 69)");
      const accentAlpha = window.innerWidth < 640 ? 0.52 : 0.38;
      const accent = acc.startsWith("rgba")
        ? acc
        : acc.replace(/^rgb\(/, "rgba(").replace(/\)$/, `, ${accentAlpha})`);
      setColors({ text: fg, shade: muted, accent });
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", sync);
    return () => {
      obs.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  const [reach, setReach] = useState(290);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReduced(mq.matches);
    onMotion();
    mq.addEventListener("change", onMotion);
    const onResize = () => setReach(window.innerWidth < 640 ? 260 : 290);
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      mq.removeEventListener("change", onMotion);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={hostWrapRef} className="hero-wordmark-fill h-full w-full">
      <VectorWordmark
        text={text}
        background="transparent"
        textColor={colors.text}
        shade={colors.shade}
        accent={colors.accent}
        reach={reach}
        speed={reduced ? 28 : 50}
        damping={reduced ? 85 : 60}
        handles={{ size: 109, spread: 27, labels: false }}
        font={{
          fontFamily,
          fontWeight,
          fontSize: `${fontSizePx}px`,
          letterSpacing,
        }}
        className={className}
        style={{
          minWidth: 0,
          minHeight: 0,
          width: "100%",
          height: "100%",
          ...style,
        }}
      />
    </div>
  );
}
