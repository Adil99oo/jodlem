import { useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import site from "@/data/site.json";
import { useReveal } from "@/lib/motion";
import { SiteGlassShell } from "@/components/ui/site-glass-shell";
import { StaggeredText } from "@/components/ui/staggered-text";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Keep it under 100 characters"),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(1000, "Keep it under 1000 characters"),
});

type Errors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

export function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as keyof Errors] ??= issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    const { error } = await supabase.from("contact_submissions").insert(parsed.data);
    if (error) { setStatus("error"); return; }
    form.reset();
    setStatus("sent");
  }

  const field = (name: keyof Errors, label: string, el: "input" | "textarea", type = "text") => (
    <div>
      <label htmlFor={name} className="mb-2 block font-medium">{label}</label>
      {el === "input" ? (
        <input id={name} name={name} type={type} className="field" aria-invalid={!!errors[name]} aria-describedby={`${name}-err`} />
      ) : (
        <textarea id={name} name={name} rows={5} className="field resize-y" aria-invalid={!!errors[name]} aria-describedby={`${name}-err`} />
      )}
      <p id={`${name}-err`} className="mt-2 min-h-5 text-sm text-destructive">{errors[name]}</p>
    </div>
  );

  return (
    <section id="contact" className="section scroll-mt-16">
      <div ref={ref} className="reveal container-x grid gap-14 lg:grid-cols-2">
        <div>
          <StaggeredText text={site.cta.title} as="h2" className="h2" segmentBy="words" direction="top" delay={55} />
          <p className="mt-5 max-w-md text-muted-foreground">{site.cta.body}</p>
          <a href="#packages" className="btn btn-primary mt-8">See plans</a>
        </div>
        <SiteGlassShell variant="card" className="rounded-xl" contentClassName="p-6 md:p-10">
          {status === "sent" ? (
            <div role="status" className="flex min-h-80 flex-col justify-center">
              <h3 className="text-3xl">Message received.</h3>
              <p className="mt-3 text-muted-foreground">A coach will reply to your email within one working day.</p>
              <button className="btn btn-on-surface mt-8 self-start" onClick={() => setStatus("idle")}>Send another</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-2">
              <h3 className="mb-4 text-[length:var(--text-h3)]">Questions? Ask a coach.</h3>
              {field("name", "Name", "input")}
              {field("email", "Email", "input", "email")}
              {field("message", "Message", "textarea")}
              {status === "error" && <p className="text-sm text-destructive" role="alert">Something went wrong. Please try again.</p>}
              <button type="submit" className="btn btn-primary mt-2" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </SiteGlassShell>
      </div>
    </section>
  );
}
