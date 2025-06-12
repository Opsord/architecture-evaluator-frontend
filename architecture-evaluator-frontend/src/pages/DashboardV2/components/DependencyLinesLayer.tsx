import React from "react";
import DependencyLine from "./DependencyLine";
import type { CompUnitVisual } from "./CompUnitsScene.tsx";

interface DependencyLinesLayerProps {
    cubes: CompUnitVisual[];
    classPosMap: Record<string, [number, number, number]>;
    hoveredLine: string | null;
    selectedCube: string | null;
    setHoveredLine: (key: string | null) => void;
}

const DependencyLinesLayer: React.FC<DependencyLinesLayerProps> = ({
                                                                       cubes,
                                                                       classPosMap,
                                                                       hoveredLine,
                                                                       selectedCube,
                                                                       setHoveredLine,
                                                                   }) => (
    <>
        {cubes.flatMap((cube) => {
            const from = cube.position;
            const source = cube.displayName;
            const deps: string[] = cube.data.classInstance.dependentClasses ?? [];
            return deps
                .filter((target: string) => classPosMap[target])
                .map((target: string) => (
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
                    />
                ));
        })}
    </>
);

export default DependencyLinesLayer;