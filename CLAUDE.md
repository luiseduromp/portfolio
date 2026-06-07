# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm lint         # ESLint check
pnpm lint:fix     # ESLint auto-fix
pnpm typecheck    # TypeScript check (no emit)
pnpm format       # Prettier format all files
pnpm format:check # Prettier check only
pnpm check        # lint + format:check together
pnpm email        # Preview email templates (react-email dev server)
```

The pre-commit hook runs `lint-staged`, which auto-fixes ESLint on staged `*.{js,ts,tsx}` files.

## Architecture

### Routing and i18n

All pages live under `src/app/[locale]/` (home, about, projects, contact). The `[locale]` segment is `en` or `es`; English is the default and omits the prefix in the URL (`localePrefix: "as-needed"`).

- **`src/proxy.ts`** is the Next.js middleware — it runs next-intl's middleware to handle locale detection and redirects for all non-asset routes.
- **`src/i18n/routing.ts`** defines the supported locales and prefix strategy.
- **`src/i18n/request.ts`** loads the correct `messages/{locale}.json` per request.
- **`src/i18n/navigation.ts`** re-exports locale-aware `Link`, `redirect`, `usePathname`, `useRouter` — always use these instead of the Next.js originals.
- Translation messages live in `messages/en.json` and `messages/es.json`.

### Content sources

There are two separate content systems:

1. **`messages/*.json`** — UI strings (nav labels, button text, metadata, form labels). Used via `next-intl` hooks (`useTranslations`, `getTranslations`).
2. **`src/data/`** — Structured resume/portfolio data (`curriculum.ts`, `resume-en.json`, `navigation.ts`). Type contracts in `src/lib/definitions.ts`.
3. **`src/content/about/`** — About-page long-form content split by locale (`en.json`, `es.json`), loaded by `getAboutContent(locale)`.
4. **`src/lib/media.ts`** — Maps project IDs to CDN URLs (`NEXT_PUBLIC_BUCKET_URL`) for covers and videos.

### Chatbot

The chatbot is an AI RAG assistant backed by the external `personal-rag` service. Flow:

1. `chatInit()` (server action in `src/lib/chatbot.ts`) authenticates against `CHATBOT_URL/token`, storing the JWT and thread ID in httpOnly cookies.
2. Streaming messages go through `POST /api/chat/stream` (route handler), which proxies the SSE stream from `CHATBOT_URL/generate-stream` using the cookie-stored JWT.
3. Client state (chat history) is managed by Zustand in `src/stores/chatStore.ts`.
4. The `ChatStream` component in the root layout mounts the chat widget globally.

### Environment variables

Env vars are split into two typed modules:

- **`src/lib/backendConfig.ts`** — server-only secrets (`env.*`): Resend keys, ReCAPTCHA secret, chatbot URL/credentials. Guarded with `import "server-only"` so Next.js throws a build error if imported in a client component.
- **`src/lib/publicConfig.ts`** — public vars (`pub.*`): `NEXT_PUBLIC_*` values safe for client use (bucket URL, ReCAPTCHA site key).

### Styling

- Tailwind CSS v4 configured via `src/app/globals.css` (no `tailwind.config.ts`).
- shadcn/ui components in `src/components/ui/` (new-york style, neutral base, CSS variables).
- Add shadcn components with `pnpm dlx shadcn@latest add <component>`.
- Fonts: Raleway (primary, CSS var `--font-raleway`) and Inconsolata (monospace, CSS var `--font-inconsolata`), loaded in the locale layout.
- GSAP handles scroll and entrance animations. The app is always in dark mode (`dark` class on `<body>`).

### Contact form

`POST /api/send` validates a ReCAPTCHA v3 token via `src/lib/captchaVerify.ts`, then sends email via Resend using the React Email template at `src/components/email/EmailTemplate.tsx`. Preview email templates with `pnpm email`.

### Path aliases

`@/` maps to `src/` (configured in `tsconfig.json`).
