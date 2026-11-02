import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import products from "@/data/products.json";
import { money, useCart } from "@/lib/cart";
import { tiltHandlers, useReveal } from "@/lib/motion";
import dumbbells from "@/assets/p-dumbbells.jpg";
import kettlebell from "@/assets/p-kettlebell.jpg";
import bands from "@/assets/p-bands.jpg";
import mat from "@/assets/p-mat.jpg";
import rope from "@/assets/p-rope.jpg";
import roller from "@/assets/p-roller.jpg";

const images: Record<string, string> = { dumbbells, kettlebell, bands, mat, rope, roller };

function ProductCard({ p }: { p: (typeof products)[number] }) {
  const { add } = useCart();
  return (
    <article {...tiltHandlers(7)} className="tilt flex flex-col overflow-hidden rounded-xl bg-background">
      <img src={images[p.image]} alt={p.name} loading="lazy" width={816} height={816} className="aspect-square w-full object-cover" />
      <div className="flex flex-1 items-end justify-between gap-4 p-6">
        <div>
          <h3 className="text-lg font-bold">{p.name}</h3>
          <p className="text-sm text-muted-foreground">{p.detail}</p>
          <p className="mt-2 text-xl font-bold">{money(p.price)}</p>
        </div>
        <button className="btn btn-primary btn-icon shrink-0" onClick={() => add(p.id)} aria-label={`Add ${p.name} to cart`}>
          <Plus className="size-5" />
        </button>
      </div>
    </article>
  );
}

export function Shop() {
  const ref = useReveal<HTMLDivElement>();
  const categories = useMemo(() => ["All", ...new Set(products.map((p) => p.category))], []);
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? products : products.filter((p) => p.category === cat);

  return (
    <section id="shop" className="section section-surface scroll-mt-16">
      <div ref={ref} className="reveal container-x">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="h2 max-w-xl">Gear that earns its place.</h2>
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={`btn min-h-11 px-5 ${cat === c ? "btn-primary" : "btn-on-surface"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}
