import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import type { SectionBackgroundSources } from "@/lib/section-backgrounds";

type SectionBackdropProps = {
  sources: SectionBackgroundSources;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"section">, "className" | "children">;

export function SectionBackdrop({ className = "", sources, children, style, ...rest }: SectionBackdropProps) {
  const mergedStyle = {
    ...style,
    "--section-bg-pos": sources.position ?? "center center",
  } as CSSProperties;

  return (
    <section className={`section-bg ${className}`.trim()} style={mergedStyle} {...rest}>
      <picture className="section-bg-picture" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet={sources.mobileWebp} type="image/webp" />
        <source media="(max-width: 767px)" srcSet={sources.mobileJpg} type="image/jpeg" />
        <source srcSet={sources.desktopWebp} type="image/webp" />
        <img
          className="section-bg-image"
          src={sources.desktopJpg}
          alt=""
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </picture>
      <div className="section-bg-scrim" aria-hidden="true" />
      <div className="section-bg-content">{children}</div>
    </section>
  );
}
