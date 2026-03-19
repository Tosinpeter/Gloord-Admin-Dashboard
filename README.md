# Gloord Admin Dashboard

Next.js (App Router) dashboard for **admin** and **doctor** workflows.

## Tech stack (locked)
- **Data**: tRPC + **@tanstack/react-query**
- **State**: **zustand**
- **Tables**: **@tanstack/react-table**
- **Forms**: **react-hook-form** + **zod**
- **I18n**: **next-intl**
- **UI**: TailwindCSS + shadcn-style components
- **Testing**: Vitest (unit) + Playwright (e2e)

## Getting started

```bash
npm install
npm run dev
```

App runs at `http://127.0.0.1:3000`.

## Scripts
- **dev**: `npm run dev`
- **build**: `npm run build`
- **lint**: `npm run lint`
- **unit tests**: `npm run test:unit`
- **e2e tests**: `npm run test:e2e`

## E2E browsers
Playwright runs:
- Chromium (Chrome)
- WebKit (Safari)
- Edge (`channel: msedge`)

## Project structure (high-level)
- **`app/`**: routes (admin + doctor) and route-segment `loading.tsx`
- **`app/api/trpc`**: tRPC handler
- **`server/trpc`**: tRPC routers/procedures
- **`lib/`**: stores/utilities/mock data
- **`components/`**: shared UI components
- **`messages/`**: `next-intl` translation files

## Notes
- The current backend is a minimal in-memory mock via tRPC for development/demo flows.
- Avoid direct `fetch()` calls in UI; use tRPC + React Query.
