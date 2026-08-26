# Architecture Evaluator — Frontend

Interactive UI for **Architecture Evaluator**. Users upload a Java project zip or point at a public GitHub repository; the backend analyzes it and this app shows maintainability metrics in a **3D layer dashboard**.

This repository is a git submodule of [architecture-evaluator](https://github.com/Opsord/architecture-evaluator). The API lives in [architecture-evaluator-backend](https://github.com/Opsord/architecture-evaluator-backend).

## Features

- Home, short instructions, and a project-load flow (zip upload or GitHub URL).
- 3D scene (React Three Fiber): classes as cubes grouped by Spring layer, with coupling lines after you select a cube.
- Side panel with program, complexity, coupling, and cohesion (LCOM) metrics.
- Dev-only mock analysis so the dashboard can be explored without a backend response.

## Stack

- React 19, TypeScript, Vite 6
- Tailwind CSS 4
- Axios
- `@react-three/fiber`, `@react-three/drei`, `three`
- Nginx (production Docker image)

There is no React Router: pages switch via React context.

## Layout

```
architecture-evaluator-frontend/   # Vite app — run all commands here
  src/
    pages/           # Home, Instructions, ProjectLoad, DashboardV2
    context/         # Navigation + project analysis state
    services/api.ts  # POST /api/orchestrator/*
    types/           # DTOs aligned with the backend
  Dockerfile         # multi-stage: Node build → Nginx on port 80
```

## Prerequisites

- Node.js 18+ (20 used in Docker)
- [pnpm](https://pnpm.io/) 10 (Corepack: `corepack enable`)
- Backend on **http://localhost:8080** for real analyses (Vite proxies `/api/orchestrator`)

## Run locally

```sh
git clone https://github.com/Opsord/architecture-evaluator-frontend.git
cd architecture-evaluator-frontend/architecture-evaluator-frontend
pnpm install
pnpm dev
```

Open **http://localhost:5173**.

| Script | What it does |
|--------|----------------|
| `pnpm dev` | Vite dev server + API proxy |
| `pnpm lint` | ESLint |
| `pnpm build` | Typecheck + production bundle |
| `pnpm preview` | Serve the production build |

With Docker (from the Vite app directory):

```sh
docker build -t architecture-evaluator-frontend .
docker run --rm -p 80:80 architecture-evaluator-frontend
```

The image expects a backend reachable as hostname `backend` on port 8080 (Compose network). For the full stack, use Docker Compose in the [parent repository](https://github.com/Opsord/architecture-evaluator).

## How it talks to the backend

Axios base URL: `/api/orchestrator` (proxied in development).

- `POST /analyze-upload` — multipart field `project`
- `POST /analyze-github` — query `repoUrl`

Requests use a 180s timeout and can be aborted from the load forms.

## License

MIT. See [LICENSE](LICENSE).
