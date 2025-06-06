// architecture-evaluator-frontend/src/pages/DashboardV2/components/CubeRow.tsx
import React from "react";
import Cube from "./Cube";
import type { CompUnitWithAnalysisDTO } from "../../../types/project-analysis";

interface CubeRowProps {
    cubes: {
        className: string;
        position: [number, number, number];
        unit: CompUnitWithAnalysisDTO;
        size: [number, number, number];
    }[];
    selectedCube: string | null;
    hoveredCube: string | null;
    setHoveredCube: (name: string | null) => void;
    setSelectedCube: (name: string | null) => void;
}

const CubeRow: React.FC<CubeRowProps> = ({
                                             cubes,
                                             selectedCube,
                                             setHoveredCube,
                                             setSelectedCube,
                                         }) => {
    return (
        <>
            {cubes.map((cube, idx) => {
                let isSelected = selectedCube === cube.className;
                let isConnected = false;
                let dimmed = false;
                if (selectedCube) {
                    const selectedDeps = cubes.find(c => c.className === selectedCube)?.unit.compUnitSummaryDTO.dependentClasses || [];
                    const selectedDependents = cubes
                        .filter(c => c.unit.compUnitSummaryDTO.dependentClasses?.includes(selectedCube))
                        .map(c => c.className);
                    isConnected =
                        selectedDeps.includes(cube.className) ||
                        selectedDependents.includes(cube.className);
                    dimmed = !isSelected && !isConnected;
                }
                return (
                    <Cube
                        key={cube.className + '-' + idx}
                        position={cube.position}
                        label={cube.className}
                        size={cube.size}
                        onPointerOver={() => setHoveredCube(cube.className)}
                        onPointerOut={() => setHoveredCube(null)}
                        onClick={() => setSelectedCube(cube.className === selectedCube ? null : cube.className)}
                        isSelected={isSelected}
                        isConnected={isConnected}
                        dimmed={dimmed}
                    />
                );
            })}
        </>
    );
};

export default CubeRow;