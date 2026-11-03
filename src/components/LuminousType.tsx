// @ts-nocheck
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
} from "react";

import { cn } from "@/lib/utils";
import "./LuminousType.css";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const approach = (current: number, target: number, dt: number, seconds: number) =>
  current + (target - current) * (1 - Math.exp(-dt / Math.max(seconds, 0.001)));

const buildMask = (xPct: number, yPct: number, radiusEm: number, softness: number) => {
  const edge = clamp(softness, 0, 1) * 55;
  const mid = 100 - edge;
  return `radial-gradient(circle ${radiusEm}em at ${xPct}% ${yPct}%, #000 0%, #000 ${mid}%, transparent 100%)`;
};

export type LuminousTypeHandle = {
  lightsOn: () => void;
  lightsOff: () => void;
};

type LuminousTypeProps = {
  text?: string;
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  fontSize?: number | string;
  fontWeight?: number;
  letterSpacing?: string;
  lineHeight?: number;
  align?: "left" | "center" | "right";
  maxWidth?: string;
  color?: string;
  tint?: string;
  baseOpacity?: number;
  radius?: number;
  softness?: number;
  trail?: number;
  follow?: number;
  idle?: "drift" | "center" | "none";
  driftSpeed?: number;
  clickToReveal?: boolean;
  interactive?: boolean;
  className?: string;
  style?: CSSProperties;
};

const LuminousType = forwardRef<LuminousTypeHandle, LuminousTypeProps>(function LuminousType(
  {
    text = "Look a little closer. There is more here than meets the eye.",
    as: Tag = "p",
    fontSize = "clamp(2rem, 5vw, 3.75rem)",
    fontWeight = 600,
    letterSpacing = "-0.035em",
    lineHeight = 1.15,
    align = "center",
    maxWidth = "20ch",
    color,
    tint = "#B19EEF",
    baseOpacity = 0.14,
    radius = 3,
    softness = 0.6,
    trail = 0.5,
    follow = 0.5,
    idle = "drift",
    driftSpeed = 1,
    clickToReveal = true,
    interactive = true,
    className,
    style,
  },
  ref,
) {
  const rootRef = useRef<HTMLElement>(null);
  const stateRef = useRef({
    x: 0.5,
    y: 0.5,
    tx: 0.5,
    ty: 0.5,
    trailX: 0.5,
    trailY: 0.5,
    pointer: false,
    t: 0,
    last: 0,
  });
  const [revealed, setRevealed] = useState(false);
  const reducedRef = useRef(false);

  useImperativeHandle(ref, () => ({
    lightsOn: () => setRevealed(true),
    lightsOff: () => setRevealed(false),
  }));

  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!query) return undefined;
    const update = () => {
      reducedRef.current = query.matches;
      if (query.matches) setRevealed(true);
    };
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reducedRef.current) return undefined;

    let raf = 0;
    const tick = (now: number) => {
      raf = 0;
      const state = stateRef.current;
      const dt = state.last ? Math.min((now - state.last) / 1000, 0.05) : 1 / 60;
      state.last = now;
      state.t += dt * driftSpeed;

      if (!revealed && idle === "drift" && !state.pointer) {
        state.tx = 0.5 + Math.sin(state.t * 0.55) * 0.32;
        state.ty = 0.5 + Math.cos(state.t * 0.42) * 0.22;
      } else if (!revealed && idle === "center" && !state.pointer) {
        state.tx = 0.5;
        state.ty = 0.5;
      }

      const followTau = 0.08 + (1 - clamp(follow, 0, 1)) * 0.35;
      state.x = approach(state.x, state.tx, dt, followTau);
      state.y = approach(state.y, state.ty, dt, followTau);

      const trailTau = 0.12 + (1 - clamp(trail, 0, 1)) * 0.45;
      state.trailX = approach(state.trailX, state.x, dt, trailTau);
      state.trailY = approach(state.trailY, state.y, dt, trailTau);

      if (!revealed) {
        root.style.setProperty("--lt-mask", buildMask(state.x * 100, state.y * 100, radius, softness));
        root.style.setProperty(
          "--lt-trail-mask",
          buildMask(state.trailX * 100, state.trailY * 100, radius * 1.15, clamp(softness + 0.15, 0, 1)),
        );
        if (tint) root.style.setProperty("--lt-tint", tint);
        else root.style.removeProperty("--lt-tint");
        root.style.setProperty("--lt-trail-opacity", String(clamp(trail, 0, 1) * 0.55));
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [
    revealed,
    idle,
    driftSpeed,
    follow,
    trail,
    radius,
    softness,
    tint,
  ]);

  const onPointerMove = (event: React.PointerEvent) => {
    if (!interactive || revealed || reducedRef.current) return;
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const state = stateRef.current;
    state.pointer = true;
    state.tx = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    state.ty = clamp((event.clientY - rect.top) / rect.height, 0, 1);
  };

  const onPointerLeave = () => {
    stateRef.current.pointer = false;
  };

  const onClick = () => {
    if (!clickToReveal || reducedRef.current) return;
    setRevealed((value) => !value);
  };

  const rootStyle: CSSProperties = {
    ...style,
    fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    textAlign: align,
    maxWidth,
    ...(color ? { ["--lt-color" as string]: color } : {}),
    ["--lt-base-opacity" as string]: String(clamp(baseOpacity, 0, 1)),
  };

  const Component = Tag as ElementType;

  return (
    <Component
      ref={rootRef}
      className={cn("luminous-type", revealed && "is-revealed", className)}
      style={rootStyle}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
      role={clickToReveal ? "button" : undefined}
      tabIndex={clickToReveal ? 0 : undefined}
      onKeyDown={(event) => {
        if (!clickToReveal) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      aria-label={clickToReveal ? `${text}. Activate to toggle full brightness.` : undefined}
    >
      <span className="luminous-type__inner">
        <span className="luminous-type__base" aria-hidden={clickToReveal ? true : undefined}>
          {text}
        </span>
        {!revealed && (
          <>
            <span className="luminous-type__trail" aria-hidden="true">
              {text}
            </span>
            <span className="luminous-type__lit" aria-hidden="true">
              {text}
            </span>
          </>
        )}
        {clickToReveal ? (
          <span className="sr-only">{text}</span>
        ) : (
          !revealed && null
        )}
      </span>
    </Component>
  );
});

export default LuminousType;
