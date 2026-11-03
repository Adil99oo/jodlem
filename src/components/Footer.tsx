import { useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { SiteGlassShell } from "@/components/ui/site-glass-shell";
import { StaggeredText } from "@/components/ui/staggered-text";

const emailSchema = z.string().trim().email().max(255);

export function Footer() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "invalid" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = emailSchema.safeParse(new FormData(form).get("email"));
    if (!parsed.success) { setState("invalid"); return; }
    setState("sending");
    const { error } = await supabase.from("newsletter_signups").insert({ email: parsed.data.toLowerCase() });
    // 23505 = already subscribed; treat as success.
    if (error && error.code !== "23505") { setState("error"); return; }
    form.reset();
    setState("done");
  }

  return (
    <footer className="footer-root section-surface pb-0 pt-20">
      <div className="container-x pb-10">
        <div className="grid gap-12 md:grid-cols-2 md:items-end">
          <div>
            <StaggeredText
              text="One email a week. Training tips and new gear."
              as="h2"
              className="text-3xl font-extrabold"
              segmentBy="words"
              direction="top"
              delay={45}
            />
            <SiteGlassShell variant="card" className="mt-6 max-w-md rounded-xl" contentClassName="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:p-3">
              <form onSubmit={onSubmit} noValidate className="contents">
                <label htmlFor="nl-email" className="sr-only">Email address</label>
                <input id="nl-email" name="email" type="email" placeholder="you@email.com" className="field min-w-0 flex-1" />
                <button className="btn btn-primary shrink-0" disabled={state === "sending"}>{state === "sending" ? "Joining..." : "Subscribe"}</button>
              </form>
            </SiteGlassShell>
            <p className="mt-3 min-h-6 text-sm" role="status">
              {state === "done" && <span className="text-accent">You're on the list.</span>}
              {state === "invalid" && <span className="text-destructive">Enter a valid email address.</span>}
              {state === "error" && <span className="text-destructive">Couldn't subscribe. Try again.</span>}
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end">
            <a href="#packages" className="hover:text-accent">Packages</a>
            <a href="#shop" className="hover:text-accent">Shop</a>
            <a href="#why" className="hover:text-accent">Why JODLEM</a>
            <a href="#contact" className="hover:text-accent">Contact</a>
          </nav>
        </div>
      </div>

      <div className="footer-brand-band">
        <picture className="footer-brand-band__photo" aria-hidden="true">
          <source
            type="image/webp"
            srcSet="/bg/footer-fists-640.webp 640w, /bg/footer-fists-768.webp 768w, /bg/footer-fists-1200.webp 1200w, /bg/footer-fists-1920.webp 1920w, /bg/footer-fists-2560.webp 2560w"
            sizes="100vw"
          />
          <img src="/bg/footer-fists-1920.webp" alt="" width={1920} height={1280} decoding="async" />
        </picture>
        <div className="footer-brand-band__scrim" aria-hidden="true" />
        <div className="container-x footer-brand-band__content">
          <p className="display select-none text-center text-[clamp(5rem,22vw,22rem)] text-background" aria-hidden="true">
            JODLEM
          </p>
          <p className="mt-6 pb-10 text-sm text-muted-foreground">© {new Date().getFullYear()} JODLEM Fitness</p>
        </div>
      </div>
    </footer>
  );
}
