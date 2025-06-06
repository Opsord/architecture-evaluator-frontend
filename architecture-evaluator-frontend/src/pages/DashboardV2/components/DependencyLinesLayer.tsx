// architecture-evaluator-frontend/src/pages/DashboardV2/components/DependencyLinesLayer.tsx
import React from "react";
import DependencyLine from "./DependencyLine";
import type { CompUnitWithAnalysisDTO } from "../../../types/project-analysis";

interface DependencyLinesLayerProps {
    cubes: {
        className: string;
        position: [number, number, number];
        unit: CompUnitWithAnalysisDTO;
    }[];
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
            const source = cube.className;
            const deps = cube.unit.compUnitSummaryDTO.dependentClasses || [];
            return deps
                .filter(target => classPosMap[target])
                .map(target => (
                    <DependencyLine
                        key={source + '->' + target}
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