import React, { useMemo, useState } from "react";
import DependencyLine from "../elements/DependencyLine.tsx";
import type { CompUnitVisual } from "../CompUnitsScene.tsx";
import { LayerAnnotation } from "../../../../../types/class/LayerAnnotation.ts";
import type { ProcessedClassInstance } from "../../../../../types/ProcessedClassInstance.ts";

interface DependencyLinesLayerProps {
    cubes: CompUnitVisual[];
    classPosMap: Record<string, [number, number, number]>;
    selectedCube: string | null;
    selectedUnit?: ProcessedClassInstance | null;
}

function shouldShowDependencyLine(
    sourceCube: CompUnitVisual,
    targetCube: CompUnitVisual | undefined,
): boolean {
    if (!targetCube) return false;
    const sourceLayer = sourceCube.data.classInstance.layerAnnotation;
    const targetLayer = targetCube.data.classInstance.layerAnnotation;
    return (
        sourceLayer !== LayerAnnotation.TESTING &&
        targetLayer !== LayerAnnotation.TESTING
    );
}

const DependencyLinesLayer: React.FC<DependencyLinesLayerProps> = ({
    cubes,
    classPosMap,
    selectedCube,
    selectedUnit,
}) => {
    const [hoveredLine, setHoveredLine] = useState<string | null>(null);

    const cubeByName = useMemo(() => {
        const map = new Map<string, CompUnitVisual>();
        for (const cube of cubes) {
            map.set(cube.displayName, cube);
        }
        return map;
    }, [cubes]);

    const lines = useMemo(() => {
        if (!selectedCube) {
            return [];
        }
        const classDependencies = new Set(selectedUnit?.classInstance?.classDependencies ?? []);
        const dependentClasses = new Set(selectedUnit?.classInstance?.dependentClasses ?? []);
        const result: {
            source: string;
            target: string;
            from: [number, number, number];
            to: [number, number, number];
            direction: "incoming" | "outgoing" | "other";
        }[] = [];

        for (const cube of cubes) {
            const source = cube.displayName;
            const deps = cube.data.classInstance.dependentClasses ?? [];
            for (const target of deps) {
                const to = classPosMap[target];
                if (!to || (source !== selectedCube && target !== selectedCube)) {
                    continue;
                }
                if (!shouldShowDependencyLine(cube, cubeByName.get(target))) {
                    continue;
                }
                let direction: "incoming" | "outgoing" | "other" = "other";
                if (target === selectedCube && classDependencies.has(source)) {
                    direction = "outgoing";
                } else if (source === selectedCube && dependentClasses.has(target)) {
                    direction = "incoming";
                }
                result.push({
                    source,
                    target,
                    from: cube.position,
                    to,
                    direction,
                });
            }
        }
        return result;
    }, [cubes, classPosMap, cubeByName, selectedCube, selectedUnit]);

    if (!selectedCube) {
        return null;
    }

    return (
        <>
            {lines.map((line) => (
                <DependencyLine
                    key={line.source + "->" + line.target}
                    from={line.from}
                    to={line.to}
                    source={line.source}
                    target={line.target}
                    hoveredLine={hoveredLine}
                    isConnected={selectedCube === line.source || selectedCube === line.target}
                    setHoveredLine={setHoveredLine}
                    direction={line.direction}
                />
            ))}
        </>
    );
};

export default React.memo(DependencyLinesLayer);
