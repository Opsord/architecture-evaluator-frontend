import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { DoubleSide } from "three";
import { Html } from "@react-three/drei";
import CameraControls from "./CameraControls";
import DependencyLine from "./DependencyLine";
import Cube from "./Cube";
import type { ProjectAnalysisDTO, CompUnitWithAnalysisDTO } from "../../../types/project-analysis.ts";

const rowSpacing = 3;

const categories = [
    { key: "controllers", label: "Controllers" },
    { key: "services", label: "Services" },
    { key: "repositories", label: "Repositories" },
    { key: "entities_documents", label: "Entities & Documents" },
    { key: "testClasses", label: "Test Classes" },
    { key: "otherClasses", label: "Other Classes" },
];

function centerLargestV2(units: CompUnitWithAnalysisDTO[]) {
    if (units.length === 0) return [];
    units.sort((a, b) => b.compUnitSummaryDTO.linesOfCode - a.compUnitSummaryDTO.linesOfCode);
    const result: CompUnitWithAnalysisDTO[] = new Array(units.length);
    let leftIdx = Math.floor(units.length / 2) - 1;
    let rightIdx = Math.floor(units.length / 2) + 1;
    result[Math.floor(units.length / 2)] = units[0];
    for (let i = 1; i < units.length; i++) {
        if (i % 2 === 1) result[rightIdx++] = units[i];
        else result[leftIdx--] = units[i];
    }
    return result;
}

interface CubeInfo {
    className: string;
    position: [number, number, number];
    unit: CompUnitWithAnalysisDTO;
    rowIdx: number;
}

interface CompUnitsSceneProps {
    projectData: ProjectAnalysisDTO;
}

const CompUnitsScene: React.FC<CompUnitsSceneProps> = ({ projectData }) => {
    const [hoveredLine, setHoveredLine] = useState<string | null>(null);
    const [setHoveredCube] = useState<string | null>(null);
    const [selectedCube, setSelectedCube] = useState<string | null>(null);

    // Compute which categories have units
    const visibleCategories = useMemo(() => {
        return categories.filter(cat => {
            if (cat.key === "entities_documents") {
                return (projectData.entities?.length || 0) + (projectData.documents?.length || 0) > 0;
            }
            // @ts-ignore
            return (projectData[cat.key]?.length || 0) > 0;
        });
    }, [projectData, projectData.documents?.length]);

    const totalHeight = (visibleCategories.length - 1) * rowSpacing;
    const verticalOffset = totalHeight / 2;

    // Prepare cubes, classPosMap, and box info
    const { cubes, classPosMap, boxes } = useMemo(() => {
        const cubes: CubeInfo[] = [];
        const classPosMap: Record<string, [number, number, number]> = {};
        const boxes: { rowIdx: number, boxPos: [number, number, number], boxSize: [number, number, number], label: string }[] = [];

        let visibleRow = 0;
        categories.forEach((cat) => {
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
            if (units.length === 0) return;

            const sortedUnits = centerLargestV2(units);
            const boxWidth = Math.max(sortedUnits.length * 2, 2);
            const boxHeight = 2;
            const boxDepth = 2;
            const y = -visibleRow * rowSpacing + verticalOffset;
            const boxPos: [number, number, number] = [0, y, 0];

            boxes.push({
                rowIdx: visibleRow,
                boxPos,
                boxSize: [boxWidth + 1, boxHeight, boxDepth + 1],
                label: cat.label,
            });

            sortedUnits.forEach((unit, colIdx) => {
                const x = (colIdx - (sortedUnits.length - 1) / 2) * 2;
                const z = 0;
                cubes.push({
                    className: unit.compUnitSummaryDTO.className,
                    position: [x, y, z],
                    unit,
                    rowIdx: visibleRow,
                });
                classPosMap[unit.compUnitSummaryDTO.className] = [x, y, z];
            });

            visibleRow++;
        });
        return { cubes, classPosMap, boxes };
    }, [projectData, projectData.documents]);

    return (
        <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 7]} intensity={1} />

            {/* Render boxes for each layer */}
            {boxes.map((box, idx) => (
                <group key={`box-${idx}`}>
                    <mesh position={box.boxPos} renderOrder={-1}>
                        <boxGeometry args={box.boxSize} />
                        <meshStandardMaterial
                            color="#cff8f5"
                            transparent={true}
                            opacity={0.05}
                            side={DoubleSide}
                            depthWrite={false}
                        />
                    </mesh>
                    <Html position={[box.boxPos[0], box.boxPos[1] + box.boxSize[1] / 2 + 0.7, box.boxPos[2]]} center>
                        <div style={{
                            background: "white",
                            color: "#17474a",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "0.9rem",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                            opacity: 0.95
                        }}>
                            {box.label}
                        </div>
                    </Html>
                </group>
            ))}

            {/* Render cubes */}
            {cubes.map((cube, idx) => {
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
            <CameraControls />
        </Canvas>
    );
};

export default CompUnitsScene;