type SectionBackgroundProps = {
  /** Base filename in /public/bg (e.g. hero-back → hero-back-1920.webp) */
  imageId: string;
  /** object-position for cover crop */
  position?: string;
  sizes?: string;
  eager?: boolean;
  /** Scrim strength preset */
  scrim?: "hero" | "packages" | "heavy" | "medium" | "light";
  className?: string;
};

const WIDTHS: Record<string, number[]> = {
  "hero-back": [640, 1024, 1920, 2560],
  default: [640, 1024, 1920],
};

export function SectionBackground({
  imageId,
  position = "center",
  sizes = "100vw",
  eager = false,
  scrim = "medium",
  className = "",
}: SectionBackgroundProps) {
  const widths = WIDTHS[imageId] ?? WIDTHS.default;
  const srcSetWebp = widths.map((w) => `/bg/${imageId}-${w}.webp ${w}w`).join(", ");
  const srcSetJpg = widths.map((w) => `/bg/${imageId}-${w}.jpg ${w}w`).join(", ");
  const fallback = `/bg/${imageId}-${widths[widths.length - 1]}.webp`;

  return (
    <div className={`section-bg-wrap section-bg-scrim-${scrim} ${className}`.trim()} aria-hidden="true">
      <picture className="section-bg-picture">
        <source type="image/webp" srcSet={srcSetWebp} sizes={sizes} />
        <source type="image/jpeg" srcSet={srcSetJpg} sizes={sizes} />
        <img
          src={fallback}
          alt=""
          className="section-bg-img"
          style={{ objectPosition: position }}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
          width={1920}
          height={1080}
        />
      </picture>
      <div className="section-bg-scrim" />
    </div>
  );
}
