import { useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

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
    <footer className="section-surface pb-10 pt-20">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-2 md:items-end">
          <div>
            <h2 className="text-3xl font-extrabold">One email a week. Training tips and new gear.</h2>
            <form onSubmit={onSubmit} noValidate className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" name="email" type="email" placeholder="you@email.com" className="field" />
              <button className="btn btn-primary shrink-0" disabled={state === "sending"}>{state === "sending" ? "Joining..." : "Subscribe"}</button>
            </form>
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
        <p className="display mt-20 select-none text-center text-[clamp(5rem,22vw,22rem)] text-background" aria-hidden="true">JODLEM</p>
        <p className="mt-6 text-sm text-muted-foreground">© {new Date().getFullYear()} JODLEM Fitness</p>
      </div>
    </footer>
  );
}
