import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import CameraControls from "./CameraControls";
import DependencyLine from "./DependencyLine";
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
                    const isConnected =
                        hoveredCube === cube.className ||
                        hoveredCube === dep ||
                        selectedCube === cube.className ||
                        selectedCube === dep;

                    return (
                        <DependencyLine
                            key={lineKey}
                            from={cube.position}
                            to={depPos}
                            source={cube.className}
                            target={dep}
                            hoveredLine={hoveredLine}
                            isConnected={isConnected}
                            setHoveredLine={setHoveredLine}
                        />
                    );
                })
            )}
            <CameraControls />
        </Canvas>
    );
};

export default CompUnitsScene;