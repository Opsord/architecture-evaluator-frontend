// architecture-evaluator-frontend/src/pages/DashboardV2/components/canvas/agrupators/DependencyLinesLayer.tsx

import React from "react";
import DependencyLine from "../elements/DependencyLine.tsx";
import type { CompUnitVisual } from "../CompUnitsScene.tsx";
import { LayerAnnotation } from "../../../../../types/class/LayerAnnotation.ts";
import type { ProcessedClassInstance } from "../../../../../types/ProcessedClassInstance.ts";

/* ==========================================================================
 * 1. TYPES
 * ======================================================================== */
interface DependencyLinesLayerProps {
    cubes: CompUnitVisual[];
    classPosMap: Record<string, [number, number, number]>;
    hoveredLine: string | null;
    selectedCube: string | null;
    setHoveredLine: (key: string | null) => void;
    selectedUnit?: ProcessedClassInstance | null;
}

/* ==========================================================================
 * 2. UTILITY FUNCTIONS
 * ======================================================================== */

/**
 * Returns the cube object by its display name.
 */
const getCubeByName = (cubes: CompUnitVisual[], name: string) =>
    cubes.find(c => c.displayName === name);

/**
 * Determines if a dependency line should be shown between two cubes.
 * Excludes lines involving test classes.
 */
function shouldShowDependencyLine(
    sourceCube: CompUnitVisual,
    targetCube: CompUnitVisual | undefined
): boolean {
    if (!targetCube) return false;
    const sourceLayer = sourceCube.data.classInstance.layerAnnotation;
    const targetLayer = targetCube.data.classInstance.layerAnnotation;
    return (
        sourceLayer !== LayerAnnotation.TESTING &&
        targetLayer !== LayerAnnotation.TESTING
    );
}

/* ==========================================================================
 * 3. MAIN COMPONENT: DependencyLinesLayer
 * ======================================================================== */
/**
 * Renders all dependency lines between class cubes in the 3D scene.
 * - Only shows lines between non-test classes.
 * - Highlights lines based on selection and direction (incoming/outgoing).
 */
const DependencyLinesLayer: React.FC<DependencyLinesLayerProps> = ({
                                                                       cubes,
                                                                       classPosMap,
                                                                       hoveredLine,
                                                                       selectedCube,
                                                                       setHoveredLine,
                                                                       selectedUnit,
                                                                   }) => {
    // Get dependencies for the selected unit
    const classDependencies = selectedUnit?.classInstance?.classDependencies ?? [];
    const dependentClasses = selectedUnit?.classInstance?.dependentClasses ?? [];

    return (
        <>
            {cubes.flatMap((cube) => {
                const from = cube.position;
                const source = cube.displayName;
                const deps: string[] = cube.data.classInstance.dependentClasses ?? [];
                return deps
                    .filter((target: string) =>
                        classPosMap[target] &&
                        shouldShowDependencyLine(cube, getCubeByName(cubes, target))
                    )
                    .map((target: string) => {
                        // Determine direction for highlighting
                        let direction: "incoming" | "outgoing" | "other" = "other";
                        if (selectedCube) {
                            if (target === selectedCube && classDependencies.includes(source)) {
                                direction = "outgoing";
                            } else if (source === selectedCube && dependentClasses.includes(target)) {
                                direction = "incoming";
                            }
                        }
                        return (
                            <DependencyLine
                                key={source + "->" + target}
                                from={from}
                                to={classPosMap[target]}
                                source={source}
                                target={target}
                                hoveredLine={hoveredLine}
                                isConnected={
                                    selectedCube
                                        ? selectedCube === source || selectedCube === target
                                        : false
                                }
                                setHoveredLine={setHoveredLine}
                                direction={direction}
                            />
                        );
                    });
            })}
        </>
    );
};

export default DependencyLinesLayer;