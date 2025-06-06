# DashboardV2 3D Scene Components

This folder contains modular React components for rendering a 3D visualization of a project's architecture using [react-three-fiber](https://docs.pmnd.rs/react-three-fiber) and [@react-three/drei](https://github.com/pmndrs/drei). The scene displays code units (classes) as cubes, grouped by architectural layers, with visualized dependencies.

## Component Overview

- **CompUnitsScene.tsx**  
  The main orchestrator. Computes the layout of layers, cubes, and dependencies from the project data. Composes the scene by rendering `LayerBox`, `CubeRow`, and `DependencyLinesLayer` components inside a `<Canvas>`. Manages selection and hover state for cubes and dependency lines.

- **LayerBox.tsx**  
  Renders a large, translucent box representing an architectural layer (e.g., Controllers, Services). Displays a floating label above the box to indicate the layer name.

- **CubeRow.tsx**  
  Renders a row of cubes for a specific layer/category. Handles the logic for selection, connection, and dimming of cubes based on user interaction. Receives an array of cube data and passes visual state to each `Cube`.

- **Cube.tsx**  
  Renders an individual cube representing a class or code unit. Changes color and opacity based on selection, connection, or dimming. Shows a tooltip with the class name when hovered or selected.

- **DependencyLinesLayer.tsx**  
  Renders all dependency lines between cubes. Receives the positions and dependencies of all cubes and draws a `DependencyLine` for each relationship.

- **DependencyLine.tsx**  
  Renders a curved line between two cubes to represent a dependency. Highlights and animates the line when hovered or when its source/target is selected. Shows a tooltip with dependency details on hover.

- **CameraControls.tsx**  
  Adds orbit, pan, and zoom controls to the 3D scene using `OrbitControls` from `@react-three/drei`.

## Data Flow

- The scene receives a `ProjectAnalysisDTO` object containing categorized code units and their analysis.
- Each code unit is positioned in a row according to its category/layer.
- Dependencies between code units are visualized as lines.
- User interactions (hover/select) update the visual state of cubes and lines for better exploration.

## Extensibility

- The modular structure allows easy addition of new visual features or architectural layers.
- Utility functions and layout logic can be further extracted for testing or reuse.

## Usage

The main entry point is `CompUnitsScene.tsx`, which is used in the dashboard page:

```tsx
<CompUnitsScene projectData={projectData} />