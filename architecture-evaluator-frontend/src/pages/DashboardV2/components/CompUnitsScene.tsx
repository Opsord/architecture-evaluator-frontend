import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei";
import { Vector3 } from "three";
import CameraControls from "./CameraControls";
import Cube from "./Cube";
import type { ProjectAnalysisDTO, CompUnitWithAnalysisDTO } from "../../../types/project-analysis.ts";

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
            units.forEach((unit, colIdx) => {
                const pos: [number, number, number] = [colIdx * 2 - units.length, -rowIdx * 2, 0];
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
            {cubes.map((cube) =>
                (cube.unit.compUnitSummaryDTO.dependentClasses || []).map((dep) => {
                    const depPos = classPosMap[dep];
                    if (!depPos) return null;

                    const lineKey = `${cube.className}->${dep}`;
                    const from = new Vector3(...cube.position);
                    const to = new Vector3(...depPos);
                    const dir = to.clone().sub(from).normalize().multiplyScalar(0.5);
                    const start = from.clone().add(dir);
                    const end = to.clone().add(dir.clone().negate());
                    const mid = start.clone().lerp(end, 0.5);

                    // Highlight if hovered/selected cube is source or target
                    const isConnected =
                        hoveredCube === cube.className ||
                        hoveredCube === dep ||
                        selectedCube === cube.className ||
                        selectedCube === dep;

                    return (
                        <group key={lineKey}>
                            <Line
                                points={[start.toArray(), end.toArray()]}
                                color={
                                    hoveredLine === lineKey
                                        ? "#20a8ac"
                                        : isConnected
                                            ? "#39c6c8"
                                            : "#17474a"
                                }
                                lineWidth={
                                    hoveredLine === lineKey
                                        ? 5
                                        : isConnected
                                            ? 4
                                            : 2
                                }
                                onPointerOver={() => setHoveredLine(lineKey)}
                                onPointerOut={() => setHoveredLine(null)}
                            />
                            {hoveredLine === lineKey && (
                                <Html position={mid.toArray()} center>
                                    <div style={{
                                        background: "white",
                                        color: "#17474a",
                                        padding: "2px 8px",
                                        borderRadius: "4px",
                                        fontSize: "0.8rem",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                                    }}>
                                        {cube.className} → {dep}
                                    </div>
                                </Html>
                            )}
                        </group>
                    );
                })
            )}
            <CameraControls />
        </Canvas>
    );
};

export default CompUnitsScene;