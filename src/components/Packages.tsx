import { Check } from "lucide-react";
import packages from "@/data/packages.json";
import { money, useCart } from "@/lib/cart";
import { tiltHandlers, useReveal } from "@/lib/motion";

function PackageCard({ pkg }: { pkg: (typeof packages)[number] }) {
  const { add, lines } = useCart();
  const inCart = lines.some((l) => l.id === pkg.id);
  const hl = pkg.highlighted;
  return (
    <article
      {...tiltHandlers(6)}
      className={`tilt flex flex-col rounded-xl p-8 md:p-10 ${hl ? "bg-accent text-accent-foreground" : "bg-surface"}`}
    >
      <h3 className="text-[length:var(--text-h3)]">{pkg.name}</h3>
      <p className={`mt-2 ${hl ? "" : "text-muted-foreground"}`}>{pkg.summary}</p>
      <p className="mt-8">
        <span className="condensed text-6xl font-black">{money(pkg.price)}</span>
        <span className={hl ? "" : "text-muted-foreground"}> / {pkg.period}</span>
      </p>
      <ul className="mt-8 flex flex-1 flex-col gap-3">
        {pkg.features.map((f) => (
          <li key={f} className="flex gap-3"><Check className={`mt-1 size-4 shrink-0 ${hl ? "" : "text-accent"}`} />{f}</li>
        ))}
      </ul>
      <button
        onClick={() => add(pkg.id)}
        className={`btn mt-10 w-full ${hl ? "btn-on-surface" : "btn-primary"}`}
        disabled={inCart}
      >
        {inCart ? "Added to cart" : `Choose ${pkg.name}`}
      </button>
    </article>
  );
}

export function Packages() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="packages" className="section scroll-mt-16">
      <div ref={ref} className="reveal container-x">
        <div className="mb-14 max-w-2xl">
          <h2 className="h2">Pick a plan. Show up. Get stronger.</h2>
          <p className="mt-5 text-muted-foreground">Monthly plans, no contracts. Switch or cancel any time from your account.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {packages.map((p) => <PackageCard key={p.id} pkg={p} />)}
        </div>
      </div>
    </section>
  );
}
