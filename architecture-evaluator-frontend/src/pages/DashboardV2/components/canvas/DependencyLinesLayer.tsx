import React from "react";
import DependencyLine from "./DependencyLine.tsx";
import type { CompUnitVisual } from "./CompUnitsScene.tsx";
import { LayerAnnotation } from "../../../../types/class/LayerAnnotation.ts";
import { ProcessedClassInstance } from "../../../../types/ProcessedClassInstance.ts";

interface DependencyLinesLayerProps {
    cubes: CompUnitVisual[];
    classPosMap: Record<string, [number, number, number]>;
    hoveredLine: string | null;
    selectedCube: string | null;
    setHoveredLine: (key: string | null) => void;
    selectedUnit?: ProcessedClassInstance | null;
}

// Helper to get a cube by displayName
const getCubeByName = (cubes: CompUnitVisual[], name: string) =>
    cubes.find(c => c.displayName === name);

// Modularized filter function
function shouldShowDependencyLine(
    sourceCube: CompUnitVisual,
    targetCube: CompUnitVisual | undefined
): boolean {
    if (!targetCube) return false;
    const sourceLayer = sourceCube.data.classInstance.layerAnnotation;
    const targetLayer = targetCube.data.classInstance.layerAnnotation;
    //Debug
    //console.log(sourceCube.displayName, sourceLayer, targetCube.displayName, targetLayer);
    return (
        sourceLayer !== LayerAnnotation.TESTING &&
        targetLayer !== LayerAnnotation.TESTING
    );
}

const DependencyLinesLayer: React.FC<DependencyLinesLayerProps> = ({
                                                                       cubes,
                                                                       classPosMap,
                                                                       hoveredLine,
                                                                       selectedCube,
                                                                       setHoveredLine,
                                                                       selectedUnit,
                                                                   }) => {
    // Get the class dependencies and dependent classes from the selected unit
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
                        // Determina la dirección
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