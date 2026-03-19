# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── ai-beauty-analyzer/ # AI Beauty Analyzer React + Vite app
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts
├── pnpm-workspace.yaml     # pnpm workspace
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## AI Beauty Analyzer App (`artifacts/ai-beauty-analyzer`)

React + Vite skincare analysis app with the following screens:
- **Onboarding** — 3-slide intro with page dots
- **Login / Register** — auth forms with validation
- **Home** — skin score, quick actions, recent scans
- **Scan** — simulated camera with face overlay and analysis
- **Report** — detailed skin metrics, recommendations
- **Routine** — morning/evening skincare steps
- **Products** — product catalog with favorites and filters
- **Progress** — charts showing skin improvement over time
- **Subscription** — free vs premium plan comparison
- **Profile** — user settings, skin type, logout

### Frontend libraries
- `recharts` — progress charts
- `framer-motion` — animations
- `date-fns` — date formatting
- `clsx` + `tailwind-merge` — styling utilities
- `wouter` — client-side routing

### Routes
- `/` — onboarding (first visit) or home (returning)
- `/login`, `/register` — authentication
- `/home` — dashboard
- `/scan` — camera scan
- `/report` — skin analysis report
- `/routine` — skincare routine
- `/products` — product recommendations
- `/progress` — progress tracking
- `/subscription` — upgrade plans
- `/profile` — user profile

## API Routes (`artifacts/api-server`)

All routes prefixed with `/api`:
- `POST /api/auth/login` — login (mock)
- `POST /api/auth/register` — register (mock)
- `GET /api/auth/profile` — get profile
- `GET/POST /api/scans` — list/create scans
- `GET /api/scans/:id` — get scan
- `GET /api/reports/:scanId` — full skin report
- `GET /api/products` — product catalog
- `GET /api/routines` — skincare routines
- `GET /api/progress` — progress data

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json`. Run typecheck from root: `pnpm run typecheck`

## Root Scripts

- `pnpm run build` — typecheck then build all packages
- `pnpm run typecheck` — full typecheck with project references
