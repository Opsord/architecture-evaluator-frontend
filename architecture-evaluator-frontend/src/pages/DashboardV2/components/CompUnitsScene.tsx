import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import { Vector3 } from "three";
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
    // Build cubes and a map from className to position
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
    }, [projectData]);

    return (
        <Canvas camera={{ position: [0, 4, 18], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 7]} intensity={1} />
            {/* Render cubes */}
            {cubes.map((cube, idx) => (
                <Cube
                    key={cube.className}
                    position={cube.position}
                    label={cube.className}
                />
            ))}
            {/* Render dependency lines */}
            {cubes.map((cube) =>
                (cube.unit.compUnitSummaryDTO.dependentClasses || []).map((dep) => {
                    const depPos = classPosMap[dep];
                    if (!depPos) return null;

                    // Calculate direction vector
                    const from = new Vector3(...cube.position);
                    const to = new Vector3(...depPos);
                    const dir = to.clone().sub(from).normalize().multiplyScalar(0.5);

                    // Offset start and end points
                    const start = from.clone().add(dir);
                    const end = to.clone().add(dir.clone().negate());

                    return (
                        <Line
                            key={`${cube.className}->${dep}`}
                            points={[start.toArray(), end.toArray()]}
                            color="#17474a"
                            lineWidth={1}
                        />
                    );
                })
            )}
            <OrbitControls
                enableRotate={true}
                enablePan={true}
                enableZoom={true}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
                screenSpacePanning={true}
            />
        </Canvas>
    );
};

export default CompUnitsScene;