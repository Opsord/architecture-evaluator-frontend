// architecture-evaluator-frontend/src/pages/DashboardV2/components/CompUnitsScene.tsx

import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import LayerBox from "./LayerBox";
import CubeRow from "./CubeRow";
import DependencyLinesLayer from "./DependencyLinesLayer";
import CameraControls from "./CameraControls";
import type { ProjectAnalysisDTO, CompUnitWithAnalysisDTO } from "../../../types/project-analysis.ts";

/* --------------------------------------------------------------------------
 * Constants and Category Definitions
 * ------------------------------------------------------------------------ */
const gap = 0.5;                // Horizontal gap between cubes
const minSize = 1;              // Minimum cube size
const maxSize = 3;              // Maximum cube size
const minCC = 1;                // Minimum cyclomatic complexity
const maxCC = 20;               // Maximum cyclomatic complexity
const minBoxWidth = 10;         // Minimum width for a layer box
const boxDepth = 2;             // Depth of each layer box
const boxMargin = 1;            // Margin around each box
const boxVerticalMargin = 1;    // Vertical margin inside each box
const verticalGap = 2;          // Vertical gap between boxes

const categories = [
    { key: "controllers", label: "Controllers" },
    { key: "services", label: "Services" },
    { key: "repositories", label: "Repositories" },
    { key: "entities_documents", label: "Entities & Documents" },
    { key: "testClasses", label: "Test Classes" },
    { key: "otherClasses", label: "Other Classes" },
];

/* --------------------------------------------------------------------------
 * Utility Functions
 * ------------------------------------------------------------------------ */

/**
 * Computes the cube size based on cyclomatic complexity.
 * Ensures a valid size even if metrics are missing.
 */
function getCubeSize(unit: CompUnitWithAnalysisDTO): [number, number, number] {
    const cc = unit.analysis.complexityMetrics.approxMcCabeCC ?? minCC;
    const size = minSize + ((Math.min(cc, maxCC) - minCC) / (maxCC - minCC)) * (maxSize - minSize);
    return [size, size, size];
}

/* --------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------ */

interface CubeInfo {
    className: string;
    position: [number, number, number];
    unit: CompUnitWithAnalysisDTO;
    rowIdx: number;
    size: [number, number, number];
}

interface CompUnitsSceneProps {
    projectData: ProjectAnalysisDTO;
}

/* --------------------------------------------------------------------------
 * Main Component
 * ------------------------------------------------------------------------ */

/**
 * CompUnitsScene
 * 3D scene for visualizing project architecture.
 * Renders layer boxes, cubes, and dependency lines.
 */
const CompUnitsScene: React.FC<CompUnitsSceneProps> = ({ projectData }) => {
    // ---------------- State for interaction ----------------
    const [hoveredLine, setHoveredLine] = useState<string | null>(null);
    const [hoveredCube, setHoveredCube] = useState<string | null>(null);
    const [selectedCube, setSelectedCube] = useState<string | null>(null);

    // ---------------- Filter visible categories ----------------
    const visibleCategories = useMemo(() => {
        return categories.filter(cat => {
            if (cat.key === "entities_documents") {
                return (projectData.entities?.length || 0) + (projectData.documents?.length || 0) > 0;
            }
            return (projectData[cat.key]?.length || 0) > 0;
        });
    }, [projectData, projectData.documents?.length]);

    // ---------------- Layout Calculation ----------------
    /**
     * Precomputes all cube positions, box sizes, and dependency maps.
     * - Each row's Y position is based on the sum of previous box heights and vertical gaps.
     * - Each box's height adapts to the tallest cube in its row plus a margin.
     * - Defensive checks ensure no NaN values are passed to geometry.
     */
    const { cubes, classPosMap, boxes, rows } = useMemo(() => {
        const cubes: CubeInfo[] = [];
        const classPosMap: Record<string, [number, number, number]> = {};
        const boxes: { rowIdx: number, boxPos: [number, number, number], boxSize: [number, number, number], label: string }[] = [];
        const rows: CubeInfo[][] = [];

        let y = 0;
        let visibleRow = 0;
        categories.forEach((cat) => {
            let units: CompUnitWithAnalysisDTO[] = [];
            if (cat.key === "entities_documents") {
                units = [
                    ...(projectData.entities || []),
                    ...(projectData.documents || []),
                ];
            } else {
                // @ts-ignore
                units = projectData[cat.key] || [];
            }
            if (units.length === 0) return;

            // Center largest units in the row
            const sortedUnits = [...units].sort((a, b) => b.compUnitSummaryDTO.linesOfCode - a.compUnitSummaryDTO.linesOfCode);
            const centeredUnits: CompUnitWithAnalysisDTO[] = new Array(sortedUnits.length);
            let leftIdx = Math.floor(sortedUnits.length / 2) - 1;
            let rightIdx = Math.floor(sortedUnits.length / 2) + 1;
            centeredUnits[Math.floor(sortedUnits.length / 2)] = sortedUnits[0];
            for (let i = 1; i < sortedUnits.length; i++) {
                if (i % 2 === 1) centeredUnits[rightIdx++] = sortedUnits[i];
                else centeredUnits[leftIdx--] = sortedUnits[i];
            }

            // Calculate sizes and positions for this row
            const sizes = centeredUnits.map(getCubeSize);
            const totalCubesWidth = sizes.reduce((sum, s) => sum + s[0], 0);
            const totalGapsWidth = (centeredUnits.length - 1) * gap;
            const boxWidth = Math.max(totalCubesWidth + totalGapsWidth, minBoxWidth);
            const tallestCube = Math.max(...sizes.map(s => s[1]), minSize);
            const boxHeight = tallestCube + boxVerticalMargin;

            const z = 0;
            const boxPos: [number, number, number] = [0, -y, 0];

            boxes.push({
                rowIdx: visibleRow,
                boxPos,
                boxSize: [boxWidth + boxMargin, boxHeight, boxDepth + boxMargin],
                label: cat.label,
            });

            // Compute cube positions in the row
            let x = -((totalCubesWidth + totalGapsWidth) / 2);
            const rowCubes: CubeInfo[] = [];
            centeredUnits.forEach((unit, idx) => {
                const size = sizes[idx];
                const cubeInfo = {
                    className: unit.compUnitSummaryDTO.className,
                    position: [x + size[0] / 2, -y, z] as [number, number, number],
                    unit,
                    rowIdx: visibleRow,
                    size,
                };
                cubes.push(cubeInfo);
                rowCubes.push(cubeInfo);
                classPosMap[unit.compUnitSummaryDTO.className] = [x + size[0] / 2, -y, z];
                x += size[0] + gap;
            });
            rows.push(rowCubes);

            // Move Y down for next row
            y += boxHeight + verticalGap;
            visibleRow++;
        });
        return { cubes, classPosMap, boxes, rows };
    }, [projectData, projectData.documents]);

    /* ----------------------------------------------------------------------
     * Render 3D Scene
     * -------------------------------------------------------------------- */
    return (
        <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 7]} intensity={1} />

            {/* Render translucent boxes for each architectural layer */}
            {boxes.map((box, idx) => {
                // Defensive: ensure no NaN in box size
                const safeBoxSize = box.boxSize.map(v => (isNaN(v) ? 1 : v)) as [number, number, number];
                return (
                    <LayerBox
                        key={`box-${idx}`}
                        position={box.boxPos}
                        size={safeBoxSize}
                        label={box.label}
                    />
                );
            })}

            {/* Render rows of cubes for each layer */}
            {rows.map((rowCubes, idx) => (
                <CubeRow
                    key={`row-${idx}`}
                    cubes={rowCubes}
                    selectedCube={selectedCube}
                    hoveredCube={hoveredCube}
                    setHoveredCube={setHoveredCube}
                    setSelectedCube={setSelectedCube}
                />
            ))}

            {/* Render dependency lines between cubes */}
            <DependencyLinesLayer
                cubes={cubes}
                classPosMap={classPosMap}
                hoveredLine={hoveredLine}
                selectedCube={selectedCube}
                setHoveredLine={setHoveredLine}
            />

            {/* Camera controls for orbit, pan, and zoom */}
            <CameraControls />
        </Canvas>
    );
};

export default CompUnitsScene;