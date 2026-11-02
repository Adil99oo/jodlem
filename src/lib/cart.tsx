import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import packages from "@/data/packages.json";
import products from "@/data/products.json";

export type CatalogItem = { id: string; name: string; price: number; kind: "package" | "product" };

/** Every sellable item, keyed by id, built from the JSON data files. */
export const catalog: Record<string, CatalogItem> = Object.fromEntries([
  ...packages.map((p) => [p.id, { id: p.id, name: `${p.name} plan`, price: p.price, kind: "package" as const }]),
  ...products.map((p) => [p.id, { id: p.id, name: p.name, price: p.price, kind: "product" as const }]),
]);

export type CartLine = { id: string; qty: number };

/** Pure cart rules, kept separate so they can be tested. */
export function addLine(lines: CartLine[], id: string): CartLine[] {
  const item = catalog[id];
  if (!item) return lines;
  const found = lines.find((l) => l.id === id);
  // A plan is a single subscription: never more than one of the same plan.
  if (found) return item.kind === "package" ? lines : lines.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
  return [...lines, { id, qty: 1 }];
}
export function setQty(lines: CartLine[], id: string, qty: number): CartLine[] {
  if (qty <= 0) return lines.filter((l) => l.id !== id);
  const item = catalog[id];
  const max = item?.kind === "package" ? 1 : 99;
  return lines.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, max) } : l));
}
export function subtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + (catalog[l.id]?.price ?? 0) * l.qty, 0);
}

type CartCtx = {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (id: string) => void;
  update: (id: string, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "jodlem-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines((JSON.parse(raw) as CartLine[]).filter((l) => catalog[l.id]));
    } catch { /* ignore corrupt storage */ }
  }, []);
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(lines)); }, [lines]);

  const value = useMemo<CartCtx>(() => ({
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    total: subtotal(lines),
    open,
    setOpen,
    add: (id) => { setLines((ls) => addLine(ls, id)); setOpen(true); },
    update: (id, qty) => setLines((ls) => setQty(ls, id, qty)),
    clear: () => setLines([]),
  }), [lines, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export const money = (n: number) => `$${n.toFixed(n % 1 ? 2 : 0)}`;
