import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";

const links = [
  { href: "#packages", label: "Packages" },
  { href: "#shop", label: "Shop" },
  { href: "#why", label: "Why JODLEM" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${scrolled ? "bg-background" : ""}`}>
      <nav className="container-x flex h-18 items-center justify-between py-4" aria-label="Main">
        <a href="#top" className="condensed text-2xl font-black uppercase">JODLEM</a>
        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.href}><a href={l.href} className="font-medium transition-colors hover:text-accent">{l.label}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary btn-icon relative" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`}>
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">{count}</span>
            )}
          </button>
          <button className="btn btn-secondary btn-icon md:hidden" onClick={() => setMenu(true)} aria-label="Open menu" aria-expanded={menu}>
            <Menu className="size-5" />
          </button>
        </div>
      </nav>

      {menu && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="container-x flex items-center justify-between py-4">
            <span className="condensed text-2xl font-black uppercase">JODLEM</span>
            <button className="btn btn-secondary btn-icon" onClick={() => setMenu(false)} aria-label="Close menu" autoFocus>
              <X className="size-5" />
            </button>
          </div>
          <ul className="container-x flex flex-1 flex-col justify-center gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setMenu(false)} className="condensed text-6xl font-black uppercase transition-colors hover:text-accent">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
