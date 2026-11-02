import site from "@/data/site.json";
import { useReveal } from "@/lib/motion";

export function Why() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="why" className="section scroll-mt-16">
      <div ref={ref} className="reveal container-x grid gap-14 lg:grid-cols-[1fr_2fr]">
        <h2 className="h2">Why JODLEM</h2>
        <div className="grid gap-10 sm:grid-cols-3">
          {site.why.map((b, i) => (
            <div key={b.title}>
              <p className="condensed text-5xl font-black text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-[length:var(--text-h3)]">{b.title}</h3>
              <p className="mt-3 text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
