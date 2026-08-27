# AGENTS.md

This repository is the **frontend** of Architecture Evaluator: a React SPA with a 3D dashboard of analyzed Spring Boot classes.

The Vite app is nested: all install, lint, build, and source work happens in `architecture-evaluator-frontend/`.

Sibling repos:

- Parent (git submodules + Docker Compose): https://github.com/Opsord/architecture-evaluator
- Backend: https://github.com/Opsord/architecture-evaluator-backend

## Setup and commands

Run from `architecture-evaluator-frontend/`:

```bash
pnpm install
pnpm dev         # Vite, default http://localhost:5173
pnpm lint
pnpm build       # tsc -b && vite build
pnpm preview
```

Package manager is **pnpm** (`packageManager` in `package.json`). Enable with `corepack enable`. Do not add `package-lock.json`. Node 20 is what the Dockerfile uses; Node 18+ should work. There is **no unit-test script**. Do not run pnpm from the git root.

Dev proxy: `/api/orchestrator` → `http://localhost:8080`. The backend must be running for zip/GitHub analysis. CORS on the backend already allows `5173`.

## Architecture

- Routing is **in-memory**, not React Router: `NavigationContext` (`home` \| `instructions` \| `load` \| `dashboard`).
- Analysis result lives in `ProjectContext` (`ProjectAnalysisDTO`). Refreshing the browser drops it (not persisted).
- `src/services/api.ts` — axios, 180s timeout, `AbortSignal` on upload/GitHub calls.
- Pages: `Home`, `Instructions`, `ProjectLoad` (zip or GitHub URL), lazy `DashboardV2`.
- 3D scene: `@react-three/fiber` + `drei` + `three`. `DashboardV2` is `React.lazy`; Vite `manualChunks` isolates Three.js.
- Types under `src/types/` should stay aligned with backend DTOs (`ProjectAnalysisInstance` / `ProcessedClassInstance`).

In **DEV only**, `ProjectContext` dynamically imports `src/services/MockData/response-zip.json` so the dashboard can be opened without an analysis. Production builds must not bundle that JSON. After a real analysis, do not let the mock overwrite `projectData`.

## Conventions

- Tailwind CSS v4 via `@tailwindcss/vite`. Use existing UI bits in `src/components/ui/`.
- Prefer extending current canvas components over new 3D libraries.
- `useFrame`: no `Math.random` and no `setState` per frame. Cube vibration uses a sine offset. Keep vibration **on by default**.
- Draw dependency lines only when a cube is selected (`DependencyLinesLayer`). Related-class colors are selection, not hover.
- Do not lift cube hover to `CompUnitsScene`. Line hover stays inside `DependencyLinesLayer`.
- Cube materials are opaque unless dimmed. Layer boxes must not steal raycasts. Layer names are a CSS overlay, not `Html` in the canvas.
- `Canvas frameloop` is `"always"` while vibration is on and `"demand"` when it is off.
- Axios calls from `UploadForm` / `GitHubForm` must honor abort on unmount; `finally` should clear loading only if the in-flight controller is still the current one.
- Keep unused dependencies out of `package.json` (no router/charts unless the UI actually uses them).
- Install and run with **pnpm**. After dependency changes, commit `pnpm-lock.yaml`. If a native package needs a postinstall (SWC, esbuild, Tailwind oxide), add it to `pnpm.onlyBuiltDependencies`.
- Keep `@types/three` as a direct devDependency. pnpm does not hoist Three.js types the way npm did, and `tsc -b` fails without them.

## Gotchas

- **Wrong working directory:** `package.json` is one level down, not at the git root.
- Dev URL is **5173**, not 3000. Docker frontend listens on port **80** and proxies `/api/` to `backend:8080`.
- `REACT_APP_API_URL` in Compose is unused (this is Vite, not CRA). The browser calls same-origin `/api/orchestrator`.
- GitHub analysis depends on the backend downloading the **`main`** branch zip.
- This repo is a **submodule** at `frontend/` in the parent. After merging here, bump the parent submodule pointer on a separate parent PR.

## Boundaries

- Do not add React Router or persist the full analysis DTO in `localStorage` unless asked.
- Do not bundle `response-zip.json` into production.
- Do not commit `dist/`, secrets, or huge fixture JSON beyond the existing mock.
