"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { cn } from "@/lib/utils";

export type SiteGlassVariant = "nav" | "panel" | "card" | "strong";

const PRESETS: Record<
  SiteGlassVariant,
  { scale: number; aberration: number; bevelDepth: number; frost: number; tint: number; radius: number }
> = {
  nav: { scale: 28, aberration: 6, bevelDepth: 16, frost: 0.35, tint: 0.06, radius: 9999 },
  panel: { scale: 34, aberration: 9, bevelDepth: 20, frost: 0.38, tint: 0.09, radius: 0 },
  card: { scale: 26, aberration: 5, bevelDepth: 14, frost: 0.32, tint: 0.08, radius: 16 },
  strong: { scale: 38, aberration: 11, bevelDepth: 24, frost: 0.42, tint: 0.1, radius: 0 },
};

export type SiteGlassShellProps = HTMLAttributes<HTMLDivElement> & {
  variant?: SiteGlassVariant;
  surfaceClassName?: string;
  contentClassName?: string;
  children: ReactNode;
  radius?: number;
  scale?: number;
  aberration?: number;
  bevelDepth?: number;
  frost?: number;
  tint?: number;
};

const surfaceStyles =
  "pointer-events-none absolute inset-0 border border-[color:var(--glass-border)] shadow-[var(--glass-shadow),inset_0_1px_0_var(--glass-highlight)]";

/** LiquidGlass refractor behind content — use instead of `.glass` where refraction helps. */
export function SiteGlassShell({
  variant = "card",
  className,
  surfaceClassName,
  contentClassName,
  children,
  radius,
  scale,
  aberration,
  bevelDepth,
  frost,
  tint,
  ...shellRest
}: SiteGlassShellProps) {
  const preset = PRESETS[variant];
  const resolvedRadius = radius ?? preset.radius;

  return (
    <div className={cn("site-glass-shell relative isolate", className)} {...shellRest}>
      <LiquidGlass
        scale={scale ?? preset.scale}
        aberration={aberration ?? preset.aberration}
        bevelDepth={bevelDepth ?? preset.bevelDepth}
        frost={frost ?? preset.frost}
        tint={tint ?? preset.tint}
        radius={resolvedRadius}
        aria-hidden
        className={cn(surfaceStyles, variant === "nav" && "rounded-[inherit]", surfaceClassName)}
      />
      <div className={cn("relative z-[1]", contentClassName)}>{children}</div>
    </div>
  );
}
