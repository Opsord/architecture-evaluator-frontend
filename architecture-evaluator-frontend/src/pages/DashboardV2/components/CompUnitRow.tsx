// architecture-evaluator-frontend/src/pages/DashboardV2/components/CubeRow.tsx
import React from "react";
import CompUnitRepresentation from "./CompUnitRepresentation.tsx";
import type { CompUnitVisual } from "./CompUnitsScene.tsx";

interface CubeRowProps {
    cubes: CompUnitVisual[];
    selectedCube: string | null;
    hoveredCube: string | null;
    setHoveredCube: (name: string | null) => void;
    setSelectedCube: (name: string | null) => void;
    vibrationEnabled: boolean;
}

const CompUnitRow: React.FC<CubeRowProps> = ({
                                                 cubes,
                                                 selectedCube,
                                                 setHoveredCube,
                                                 setSelectedCube,
                                                 vibrationEnabled,
                                             }) => {
    return (
        <>
            {cubes.map((cube, idx) => {
                let isSelected = selectedCube === cube.displayName;
                let isConnected = false;
                let dimmed = false;
                if (selectedCube) {
                    const selectedDeps =
                        cubes.find(c => c.displayName === selectedCube)?.data.classInstance.dependentClasses ?? [];
                    const selectedDependents = cubes
                        .filter(c => (c.data.classInstance.dependentClasses ?? []).includes(selectedCube))
                        .map(c => c.displayName);
                    isConnected =
                        selectedDeps.includes(cube.displayName) ||
                        selectedDependents.includes(cube.displayName);
                    dimmed = !isSelected && !isConnected;
                }
                return (
                    <CompUnitRepresentation
                        key={cube.displayName + '-' + idx}
                        position={cube.position}
                        label={cube.displayName}
                        size={cube.size}
                        unit={cube.data}
                        vibrationEnabled={vibrationEnabled}
                        onPointerOver={() => setHoveredCube(cube.displayName)}
                        onPointerOut={() => setHoveredCube(null)}
                        onClick={() => setSelectedCube(cube.displayName === selectedCube ? null : cube.displayName)}
                        isSelected={isSelected}
                        isConnected={isConnected}
                        dimmed={dimmed}
                    />
                );
            })}
        </>
    );
};

export default CompUnitRow;