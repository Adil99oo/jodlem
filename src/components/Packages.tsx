import { useState, type CSSProperties } from "react";
import packages from "@/data/packages.json";
import { money, useCart } from "@/lib/cart";
import { useReveal } from "@/lib/motion";
import { StaggeredText } from "@/components/ui/staggered-text";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const METRIC_LABELS = ["Program", "Coaching", "Extras", "Support", "Access"];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="lp-arrow-icon">
      <path
        d="M5 12H19M14 7L19 12L14 17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={`lp-chevron ${open ? "is-open" : ""}`}>
      <path
        d="M6.5 8L10 11.5L13.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PackageCard({ pkg, index }: { pkg: (typeof packages)[number]; index: number }) {
  const { add, lines } = useCart();
  const inCart = lines.some((l) => l.id === pkg.id);
  const [expanded, setExpanded] = useState(false);
  const featured = pkg.highlighted;

  const metrics = pkg.features.slice(0, 3).map((value, i) => ({
    label: METRIC_LABELS[i] ?? "Included",
    value,
  }));
  const extraMetrics = pkg.features.slice(3).map((value, i) => ({
    label: METRIC_LABELS[i + 3] ?? "Also includes",
    value,
  }));
  const hasExtra = extraMetrics.length > 0;

  return (
    <article
      className={`lp-card-shell ${featured ? "is-featured" : ""}`}
      style={{ "--card-delay": `${index * 100}ms` } as CSSProperties}
    >
      <CardContainer containerClassName="py-0 w-full" className="w-full max-w-full">
        <CardBody className="group/card lp-card relative h-auto w-full min-w-0 max-w-full">
          {featured && (
            <div className="lp-popular-label">
              <span className="lp-popular-dot" />
              Most popular
            </div>
          )}

          <CardItem translateZ={50} className="w-full">
            <header className="lp-card-header">
              <p className="lp-plan-name">{pkg.name}</p>

              <div className="lp-price-row">
                <span className="lp-price">{money(pkg.price)}</span>
                <span className="lp-month">/ {pkg.period}</span>
              </div>
            </header>
          </CardItem>

          <CardItem translateZ={55} className="w-full">
            <p className="lp-plan-description">{pkg.summary}</p>
          </CardItem>

          <CardItem translateZ={70} className="mt-4 w-full">
            <button
              type="button"
              className={`lp-choose-button ${featured ? "is-featured" : ""}`}
              onClick={() => add(pkg.id)}
              disabled={inCart}
            >
              <span>{inCart ? "Added to cart" : `Choose ${pkg.name}`}</span>
              {!inCart && <ArrowIcon />}
            </button>
          </CardItem>

          <CardItem translateZ={40} className="w-full">
            <div className="lp-divider" aria-hidden="true" />

            <div className="lp-details">
              <p className="lp-details-title">What&apos;s included:</p>

              <div className="lp-metrics">
                {metrics.map((metric) => (
                  <div className="lp-metric" key={metric.label}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
              </div>

              {hasExtra && (
                <div className={`lp-extra-metrics ${expanded ? "is-visible" : ""}`}>
                  <div className="lp-extra-inner">
                    {extraMetrics.map((metric) => (
                      <div className="lp-metric" key={metric.value}>
                        <span>{metric.label}</span>
                        <strong>{metric.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardItem>

          {hasExtra && (
            <CardItem translateZ={45} className="w-full">
              <button
                type="button"
                className="lp-view-more"
                onClick={() => setExpanded((current) => !current)}
                aria-expanded={expanded}
              >
                <span>{expanded ? "View less" : "View more"}</span>
                <ChevronIcon open={expanded} />
              </button>
            </CardItem>
          )}
        </CardBody>
      </CardContainer>
    </article>
  );
}

export function Packages() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="packages" className="section scroll-mt-16">
      <div ref={ref} className="reveal container-x">
        <div className="mb-10 max-w-2xl md:mb-12">
          <StaggeredText
            text="Pick a plan. Show up. Get stronger."
            as="h2"
            className="h2"
            segmentBy="words"
            direction="top"
            delay={55}
          />
          <p className="mt-5 text-muted-foreground">
            Monthly plans, no contracts. Switch or cancel any time from your account.
          </p>
        </div>

        <div className="jodlem-pricing lp-root">
          <div className="lp-content">
            <div className="lp-cards">
              {packages.map((p, index) => (
                <PackageCard key={p.id} pkg={p} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
