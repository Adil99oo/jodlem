import { useEffect, useState } from "react";
import { Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
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
  const [light, setLight] = useState(false);

  useEffect(() => setLight(document.documentElement.classList.contains("light")), []);

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("jodlem-theme", next ? "light" : "dark");
    } catch {
      /* storage blocked */
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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

  const closeMenu = () => setMenu(false);
  const showNavGlass = scrolled || menu;
  const navGlassRadius = menu ? 20 : 9999;

  return (
    <header className="nav-header safe-top">
      <div
        className="nav-shell"
        data-scrolled={scrolled || undefined}
        data-menu-open={menu || undefined}
      >
        {showNavGlass ? (
          <LiquidGlass
            radius={navGlassRadius}
            scale={28}
            aberration={6}
            bevelDepth={16}
            frost={0.35}
            tint={0.06}
            aria-hidden
            className="nav-liquid-glass pointer-events-none absolute inset-0 rounded-[inherit] border border-[color:var(--glass-border)] shadow-[var(--glass-shadow),inset_0_1px_0_var(--glass-highlight)]"
          />
        ) : null}
        <nav className="nav-bar relative z-[2]" aria-label="Main">
          <a href="#top" className="navbar-logo" aria-label="JODLEM home">
            <span className="navbar-logo-text condensed font-black uppercase">JODLEM</span>
          </a>

          <ul className="nav-links hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="nav-link">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <a href="#shop" className="btn btn-secondary nav-cta nav-cta-secondary hidden lg:inline-flex">
              Shop gear
            </a>
            <a href="#packages" className="btn btn-primary nav-cta hidden lg:inline-flex">
              Start now
            </a>
            <button
              type="button"
              className="btn btn-secondary btn-icon nav-icon-btn"
              onClick={toggleTheme}
              aria-label={light ? "Switch to night mode" : "Switch to day mode"}
            >
              {light ? <Moon className="size-5" /> : <Sun className="size-5" />}
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-icon nav-icon-btn relative"
              onClick={() => setOpen(true)}
              aria-label={`Open cart, ${count} items`}
            >
              <ShoppingBag className="size-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-icon nav-icon-btn md:hidden"
              onClick={() => setMenu((o) => !o)}
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              aria-controls="nav-mobile-panel"
            >
              {menu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        <div
          id="nav-mobile-panel"
          className="nav-mobile-panel relative z-[2] md:hidden"
          role="region"
          aria-label="Mobile navigation"
          aria-hidden={!menu}
        >
          <div className="nav-mobile-panel-inner">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={closeMenu} className="nav-mobile-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <a href="#shop" onClick={closeMenu} className="btn btn-secondary w-full sm:flex-1">
                Shop gear
              </a>
              <a href="#packages" onClick={closeMenu} className="btn btn-primary w-full sm:flex-1">
                Start now
              </a>
            </div>
          </div>
        </div>
      </div>

      {menu && (
        <button
          type="button"
          className="nav-mobile-backdrop md:hidden"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}
