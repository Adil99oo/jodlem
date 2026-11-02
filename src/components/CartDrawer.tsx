import { useEffect, useRef, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { catalog, money, useCart } from "@/lib/cart";

export function CartDrawer() {
  const { open, setOpen, lines, total, update } = useCart();
  const panel = useRef<HTMLDivElement>(null);
  const [note, setNote] = useState(false);

  useEffect(() => {
    if (!open) { setNote(false); return; }
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      // Simple focus trap
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("button:not([disabled]), a");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; prev?.focus(); };
  }, [open, setOpen]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 h-full w-full cursor-default bg-background" aria-label="Close cart" tabIndex={-1} onClick={() => setOpen(false)} />
      <div ref={panel} role="dialog" aria-modal="true" aria-label="Your cart"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-surface p-6 animate-in slide-in-from-right duration-300 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">Your cart</h2>
          <button className="btn btn-on-surface btn-icon" onClick={() => setOpen(false)} aria-label="Close cart"><X className="size-5" /></button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-6">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <a href="#shop" className="btn btn-primary" onClick={() => setOpen(false)}>Browse gear</a>
          </div>
        ) : (
          <>
            <ul className="mt-8 flex flex-1 flex-col gap-3 overflow-y-auto">
              {lines.map((l) => {
                const item = catalog[l.id];
                if (!item) return null;
                return (
                  <li key={l.id} className="flex items-center justify-between gap-4 rounded-lg bg-background p-4">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{money(item.price)}{item.kind === "package" ? " / month" : ""}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="btn btn-secondary btn-icon size-9 min-h-9" onClick={() => update(l.id, l.qty - 1)} aria-label={`Remove one ${item.name}`}><Minus className="size-4" /></button>
                      <span className="w-6 text-center font-bold" aria-label="Quantity">{l.qty}</span>
                      <button className="btn btn-secondary btn-icon size-9 min-h-9" onClick={() => update(l.id, l.qty + 1)} disabled={item.kind === "package"} aria-label={`Add one ${item.name}`}><Plus className="size-4" /></button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6">
              <div className="flex justify-between text-lg"><span>Subtotal</span><span className="font-bold">{money(total)}</span></div>
              <button className="btn btn-primary mt-5 w-full" onClick={() => setNote(true)}>Checkout</button>
              {note && <p className="mt-3 text-sm text-muted-foreground" role="status">Online checkout opens soon. Use the contact form to order now.</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
