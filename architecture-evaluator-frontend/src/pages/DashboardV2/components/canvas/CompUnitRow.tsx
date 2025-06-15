import React from "react";
import CompUnitRepresentation from "./CompUnitRepresentation.tsx";
import type { CompUnitVisual } from "./CompUnitsScene.tsx";

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