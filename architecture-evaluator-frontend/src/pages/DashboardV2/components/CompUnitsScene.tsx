import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cube from "./Cube";
import type { ProjectAnalysisDTO } from "../../../types/project-analysis.ts";

const categories = [
    { key: "controllers", label: "Controllers" },
    { key: "services", label: "Services" },
    { key: "repositories", label: "Repositories" },
    { key: "entities_documents", label: "Entities & Documents" },
    { key: "testClasses", label: "Test Classes" },
    { key: "otherClasses", label: "Other Classes" },
];

interface CompUnitsSceneProps {
    projectData: ProjectAnalysisDTO;
}

const CompUnitsScene: React.FC<CompUnitsSceneProps> = ({ projectData }) => {
    return (
        <Canvas camera={{ position: [0, 4, 18], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 7]} intensity={1} />
            {categories.map((cat, rowIdx) => {
                let units: any[] = [];
                if (cat.key === "entities_documents") {
                    units = [
                        ...(projectData.entities || []),
                        ...(projectData.documents || []),
                    ];
                } else {
                    // @ts-ignore
                    units = projectData[cat.key] || [];
                }
                return units.map((unit, colIdx) => (
                    <Cube
                        key={`${cat.key}-${colIdx}`}
                        position={[colIdx * 2 - units.length, -rowIdx * 2, 0]}
                        label={unit.compUnitSummaryDTO.className}
                    />
                ));
            })}
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