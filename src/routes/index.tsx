import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/lib/cart";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Packages } from "@/components/Packages";
import { Shop } from "@/components/Shop";
import { Why } from "@/components/Why";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JODLEM Fitness — Training plans and gym gear" },
      { name: "description", content: "Progressive training plans, real coaches and tested fitness gear from JODLEM Fitness." },
      { property: "og:title", content: "JODLEM Fitness — Training plans and gym gear" },
      { property: "og:description", content: "Progressive training plans, real coaches and tested fitness gear." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <a href="#packages" className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <Packages />
        <Shop />
        <Why />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
