# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Kiddo** ("Ma Journée d'École") is a French-language daily school activity diary for children. It tracks activities across time periods of a school day and supports three views: timeline, week, and calendar. Data is persisted in browser localStorage with optional remote backup via Cloudflare KV.

## Commands

```bash
npm run dev          # Start dev server (port 8080)
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # ESLint
npm run test         # Run tests once (vitest run)
npm run test:watch   # Run tests in watch mode
npm run preview      # Preview production build
```

Tests use Vitest with jsdom. Test files go in `src/**/*.{test,spec}.{ts,tsx}`.

### Worker (Cloudflare)

```bash
cd worker
npm run dev              # Local worker dev server
npm run deploy           # Deploy worker to Cloudflare
```

## Architecture

### Entry Flow
`index.html` → `src/main.tsx` → `App.tsx` (providers + router) → `pages/Index.tsx` (main page)

### State Management
All diary data flows through the **`useDiary()` custom hook** (`src/hooks/useDiary.ts`). This hook owns the entire data lifecycle:
- Reads/writes `localStorage` under key `'ma-journee-diary'`
- Stores entries as `Record<string, DayEntry>` keyed by `yyyy-MM-dd` date strings
- Exposes methods: `toggleActivity`, `addCustomActivity`, `updateCustomActivity`, `removeCustomActivity`, `updateLunchMenu`
- No Redux, no Context — pure React hooks with localStorage persistence

### Remote Backup (Cloudflare KV)
- **API client** (`src/lib/api.ts`): `fetchAllEntries()`, `fetchEntry()`, `saveEntry()` — all fire-and-forget, return `null` if not configured
- **Worker** (`worker/src/index.ts`): Cloudflare Worker exposing `GET /api/entries`, `GET /api/entries/:date`, `PUT /api/entries/:date` with Bearer token auth and CORS
- **Sync strategy**: localStorage is the immediate source of truth. On mount, remote entries are fetched and merged (remote wins per date). Each mutation triggers a fire-and-forget PUT to the API
- **Graceful degradation**: if `VITE_API_URL` or `VITE_API_TOKEN` env vars are absent, the app works in localStorage-only mode
- **Config**: copy `.env.example` to `.env.local` and fill in your worker URL and API token

### View System
`Index.tsx` manages a `view` state (`'timeline' | 'week' | 'calendar'`) and a `selectedDate`. The Header component switches views; each view renders from the same `useDiary()` hook.

- **Timeline**: Main editing interface. Shows 5 checkpoints (start → morning-break → lunch → afternoon-break → home) with 4 editable period cards between them. Horizontal on desktop, vertical on mobile (768px breakpoint via `useIsMobile()` hook).
- **WeekView**: Read-only Mon–Fri grid. Clicking a day switches to timeline view.
- **CalendarView**: Month picker with dot indicators on days that have entries. Shows DaySummary for selected date.

### Component Organization
- `src/components/diary/` — 10 domain components (Timeline, PeriodCard, ActivityPicker, EmojiPicker, CheckpointMarker, LunchInput, CalendarView, WeekView, DaySummary, Header)
- `src/components/ui/` — shadcn/ui components (auto-generated, do not edit manually)
- `src/types/diary.ts` — All domain types and constants (PeriodId, CheckpointId, DayEntry, Activity, ACTIVITIES array of 16 predefined activities)
- `src/lib/emojiData.ts` — Emoji categories and search data
- `src/lib/api.ts` — API client for Cloudflare KV backup
- `worker/` — Cloudflare Worker (KV-backed REST API, deployed separately)

### Key Types (from `src/types/diary.ts`)
- `PeriodId`: `'morning' | 'late-morning' | 'afternoon' | 'late-afternoon'`
- `CheckpointId`: `'start' | 'morning-break' | 'lunch' | 'afternoon-break' | 'home'`
- `DayEntry`: contains `date`, `periods` (Record of PeriodEntry per PeriodId), optional `lunchMenu`
- `PeriodEntry`: contains `activities` (string IDs) and `customActivities` (CustomActivity[])

### Styling
- Tailwind CSS with HSL CSS variables defined in `src/index.css`
- Custom pastel palette: lavender (morning), mint (late-morning), peach (lunch), sky (afternoon), rose (late-afternoon)
- Dark mode supported via class-based toggling
- shadcn/ui configured with `@` path alias, no RSC, slate base color

## Path Aliases

`@/*` maps to `./src/*` (configured in both `vite.config.ts` and `tsconfig.json`).

## Localization

UI is in French. date-fns French locale is used for date formatting. Activities have both `label` (English) and `labelFr` (French) fields.
