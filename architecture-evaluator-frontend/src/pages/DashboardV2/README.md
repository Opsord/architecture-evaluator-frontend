# DashboardV2 3D scene

React Three Fiber components that render analyzed classes as cubes, grouped by Spring architectural layer, with coupling shown as curves **after a cube is selected**.

## Components

- **CompUnitsScene.tsx** — Layout of layers and cubes from `ProjectAnalysisDTO`. Owns the `<Canvas>`, selection/hover, and composes the pieces below.
- **LayerBox.tsx** — Translucent box + label for a layer (controllers, services, …).
- **CompUnitRow.tsx** — One row of cubes for a layer; passes selection/dimming into each cube.
- **CubeElement.tsx** — One class. Idle motion is a sine offset (not per-frame React state). Tooltip on hover/select.
- **DependencyLinesLayer.tsx** — Coupling lines for the **selected** cube only.
- **DependencyLine.tsx** — Curved `Line` between two cubes; highlight + tooltip on hover.
- **CameraControls.tsx** — `OrbitControls` (orbit, pan, zoom).

Related UI (siblings of `components/canvas/`):

- **ProcessedClassInfoCard.tsx** — Metrics for the selected class.
- **DashboardLegend.tsx** — Layer colors / metric legend.
- **CanvasNavigationTips.tsx** — Camera hints.

## Data flow

1. `DashboardV2` reads `projectData` from `ProjectContext`.
2. `CompUnitsScene` buckets `ProcessedClassInstance` lists by layer and places cubes.
3. Selecting a cube updates the info card and reveals that cube’s dependency lines.

## Usage

```tsx
<CompUnitsScene
  projectData={projectData}
  selectedCube={selectedCube}
  setSelectedCube={(name, unit) => { /* ... */ }}
  vibrationEnabled={vibrationEnabled}
/>
```
