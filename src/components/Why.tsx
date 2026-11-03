import { Dumbbell, TrendingUp, UserCheck } from "lucide-react";
import site from "@/data/site.json";
import { useReveal } from "@/lib/motion";
import { StaggeredText } from "@/components/ui/staggered-text";

const icons = [TrendingUp, Dumbbell, UserCheck];

export function Why() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="why" className="section scroll-mt-16">
      <div ref={ref} className="reveal container-x">
        <StaggeredText
          text="Why JODLEM"
          as="h2"
          className="why-section-title h2"
          segmentBy="words"
          direction="top"
          delay={55}
        />
        <div className="mt-10 grid gap-10 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {site.why.map((b, i) => {
            const Icon = icons[i % icons.length] ?? TrendingUp;
            return (
              <div key={b.title}>
                <span className="grid size-14 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-[length:var(--text-h3)]">{b.title}</h3>
                <p className="mt-3 text-muted-foreground">{b.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
