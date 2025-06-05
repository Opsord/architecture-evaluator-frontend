import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import CameraControls from "./CameraControls";
import DependencyLine from "./DependencyLine";
import Cube from "./Cube";
import type { ProjectAnalysisDTO, CompUnitWithAnalysisDTO } from "../../../types/project-analysis.ts";

function centerLargest(units: CompUnitWithAnalysisDTO[]) {
    const sorted = [...units].sort(
        (a, b) => b.compUnitSummaryDTO.linesOfCode - a.compUnitSummaryDTO.linesOfCode
    );
    const result: CompUnitWithAnalysisDTO[] = [];
    let left: CompUnitWithAnalysisDTO[] = [];
    let right: CompUnitWithAnalysisDTO[] = [];
    sorted.forEach((unit, idx) => {
        if (idx === 0) {
            result.push(unit); // center
        } else if (idx % 2 === 1) {
            right.push(unit);
        } else {
            left.unshift(unit);
        }
    });
    return [...left, ...result, ...right];
}

function centerLargestV2(units: CompUnitWithAnalysisDTO[]) {
    if (units.length === 0) return [];

    // Sort in descending order by lines of code
    units.sort((a, b) => b.compUnitSummaryDTO.linesOfCode - a.compUnitSummaryDTO.linesOfCode);

    const result: CompUnitWithAnalysisDTO[] = new Array(units.length);
    let leftIdx = Math.floor(units.length / 2) - 1; // Start filling left from the middle
    let rightIdx = Math.floor(units.length / 2) + 1; // Start filling right from the middle

    result[Math.floor(units.length / 2)] = units[0]; // Place the largest in the center

    for (let i = 1; i < units.length; i++) {
        if (i % 2 === 1) {
            result[rightIdx++] = units[i]; // Place on the right
        } else {
            result[leftIdx--] = units[i]; // Place on the left
        }
    }

    return result;
}

const categories = [
    { key: "controllers", label: "Controllers" },
    { key: "services", label: "Services" },
    { key: "repositories", label: "Repositories" },
    { key: "entities_documents", label: "Entities & Documents" },
    { key: "testClasses", label: "Test Classes" },
    { key: "otherClasses", label: "Other Classes" },
];

interface CubeInfo {
    className: string;
    position: [number, number, number];
    unit: CompUnitWithAnalysisDTO;
}

interface CompUnitsSceneProps {
    projectData: ProjectAnalysisDTO;
}

const CompUnitsScene: React.FC<CompUnitsSceneProps> = ({ projectData }) => {
    const [hoveredLine, setHoveredLine] = useState<string | null>(null);
    const [hoveredCube, setHoveredCube] = useState<string | null>(null);
    const [selectedCube, setSelectedCube] = useState<string | null>(null);

    const { cubes, classPosMap } = useMemo(() => {
        const cubes: CubeInfo[] = [];
        const classPosMap: Record<string, [number, number, number]> = {};
        categories.forEach((cat, rowIdx) => {
            let units: CompUnitWithAnalysisDTO[] = [];
            if (cat.key === "entities_documents") {
                units = [
                    ...(projectData.entities || []),
                    ...(projectData.documents || []),
                ];
            } else {
                // @ts-ignore
                units = projectData[cat.key] || [];
            }
            const sortedUnits = centerLargestV2(units);
            sortedUnits.forEach((unit, colIdx) => {
                const pos: [number, number, number] = [colIdx * 2 - sortedUnits.length, -rowIdx * 2, 0];
                const className = unit.compUnitSummaryDTO.className;
                cubes.push({ className, position: pos, unit });
                classPosMap[className] = pos;
            });
        });
        return { cubes, classPosMap };
    }, [projectData, projectData.documents]);

    return (
        <Canvas camera={{ position: [0, 4, 18], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 7]} intensity={1} />
            {/* Render cubes */}
            {cubes.map((cube, idx) => (
                <Cube
                    key={cube.className + '-' + idx}
                    position={cube.position}
                    label={cube.className}
                    onPointerOver={() => setHoveredCube(cube.className)}
                    onPointerOut={() => setHoveredCube(null)}
                    onClick={() => setSelectedCube(cube.className === selectedCube ? null : cube.className)}
                />
            ))}
            {/* Render dependency lines */}
            {cubes.map((cube, idx) => {
                // Determine connection state for highlighting
                let isSelected = selectedCube === cube.className;
                let isConnected = false;
                let dimmed = false;

                if (selectedCube) {
                    const selectedUnit = cubes.find(c => c.className === selectedCube)?.unit;
                    const selectedDeps = selectedUnit?.compUnitSummaryDTO.dependentClasses || [];
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
                        onPointerOver={() => setHoveredCube(cube.className)}
                        onPointerOut={() => setHoveredCube(null)}
                        onClick={() => setSelectedCube(cube.className === selectedCube ? null : cube.className)}
                        isSelected={isSelected}
                        isConnected={isConnected}
                        dimmed={dimmed}
                    />
                );
            })}

            {/* Render dependency lines */}
            {cubes.flatMap((cube) => {
                const from = cube.position;
                const source = cube.className;
                const deps = cube.unit.compUnitSummaryDTO.dependentClasses || [];
                return deps
                    .filter(target => classPosMap[target]) // Only draw if target exists
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
            <CameraControls />
        </Canvas>
    );
};

export default CompUnitsScene;