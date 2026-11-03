// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Pin Vercel output on Vercel CI only (Lovable/sandbox keeps cloudflare-module). No extra nitro() plugin.
  nitro: process.env.VERCEL ? { preset: "vercel" } : {},
  vite: {
    ssr: {
      // Supabase packages import tslib; bundle it so Vercel functions never hit ERR_MODULE_NOT_FOUND.
      noExternal: ["tslib"],
    },
  },
});
