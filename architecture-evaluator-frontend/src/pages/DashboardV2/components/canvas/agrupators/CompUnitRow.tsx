import React from "react";
import CubeElement from "../elements/CubeElement.tsx";
import type { CompUnitVisual } from "../CompUnitsScene.tsx";

export type FlaggedCube = CompUnitVisual & {
    isSelected: boolean;
    isDependency: boolean;
    isDependent: boolean;
    dimmed: boolean;
};

interface CubeRowProps {
    cubes: FlaggedCube[];
    onSelectCube: (name: string) => void;
    vibrationEnabled: boolean;
}

const CompUnitRow: React.FC<CubeRowProps> = ({
    cubes,
    onSelectCube,
    vibrationEnabled,
}) => (
    <>
        {cubes.map((cube) => (
            <CubeElement
                key={cube.displayName}
                position={cube.position}
                label={cube.displayName}
                size={cube.size}
                unit={cube.data}
                vibrationEnabled={vibrationEnabled}
                onSelect={onSelectCube}
                isSelected={cube.isSelected}
                isDependency={cube.isDependency}
                isDependent={cube.isDependent}
                dimmed={cube.dimmed}
            />
        ))}
    </>
);

export default React.memo(CompUnitRow);
