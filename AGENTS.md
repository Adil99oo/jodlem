<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Site copy, prices and catalog live in src/data/*.json; components only render them (keeps content editable in one place).
- The hero is a static athlete photo (src/assets/hero-athlete.jpg) over a giant brand name in src/components/Hero.tsx, with rAF scroll parallax; no three.js anywhere in the project.
- Contact and newsletter forms insert directly from the browser into insert-only tables (contact_submissions, newsletter_signups); anon cannot read them.
