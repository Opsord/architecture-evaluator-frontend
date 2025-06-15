// architecture-evaluator-frontend/src/pages/DashboardV2/components/canvas/agrupators/CompUnitRow.tsx

import React from "react";
import CubeElement from "../elements/CubeElement.tsx";
import type { CompUnitVisual } from "../CompUnitsScene.tsx";

/* ==========================================================================
 * 1. TYPES
 * ======================================================================== */
interface CubeRowProps {
    cubes: (CompUnitVisual & {
        isSelected?: boolean;
        isDependency?: boolean;
        isDependent?: boolean;
        dimmed?: boolean;
    })[];
    selectedCube: string | null;
    hoveredCube: string | null;
    setHoveredCube: (name: string | null) => void;
    setSelectedCube: (name: string | null) => void;
    vibrationEnabled: boolean;
}

/* ==========================================================================
 * 2. MAIN COMPONENT: CompUnitRow
 * ======================================================================== */
/**
 * Renders a row of class cubes for a given architectural layer.
 * - Each cube receives visual state flags (selected, dependency, etc.).
 * - Handles hover and selection events for each cube.
 */
const CompUnitRow: React.FC<CubeRowProps> = ({
                                                 cubes,
                                                 selectedCube,
                                                 setHoveredCube,
                                                 setSelectedCube,
                                                 vibrationEnabled,
                                             }) => {
    return (
        <>
            {cubes.map((cube, idx) => (
                <CubeElement
                    key={cube.displayName + '-' + idx}
                    position={cube.position}
                    label={cube.displayName}
                    size={cube.size}
                    unit={cube.data}
                    vibrationEnabled={vibrationEnabled}
                    onPointerOver={() => setHoveredCube(cube.displayName)}
                    onPointerOut={() => setHoveredCube(null)}
                    onClick={() => setSelectedCube(cube.displayName === selectedCube ? null : cube.displayName)}
                    isSelected={cube.isSelected}
                    isDependency={cube.isDependency}
                    isDependent={cube.isDependent}
                    dimmed={cube.dimmed}
                />
            ))}
        </>
    );
};

export default CompUnitRow;