import React, { useState } from "react";
import { useProjectContext } from "../../context/ProjectContext";
import CompUnitsScene from "./components/CompUnitsScene";
import CompUnitInfoCard from "./components/CompUnitInfoCard";
import type { CompUnitWithAnalysisDTO } from "../../types/project-analysis";

const DashboardV2: React.FC = () => {
    const { projectData } = useProjectContext();
    const [selectedCube, setSelectedCube] = useState<string | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<CompUnitWithAnalysisDTO | null>(null);

    if (!projectData) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-500">
                No data available. Please analyze a project first.
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen">
            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* 3D Scene */}
                <div className="flex-1 bg-gray-100">
                    <CompUnitsScene
                        projectData={projectData}
                        selectedCube={selectedCube}
                        setSelectedCube={(name, unit) => {
                            setSelectedCube(name);
                            setSelectedUnit(unit);
                        }}
                    />
                </div>

                {/* Info Card */}
                <div className="w-96 bg-white border-l border-gray-border p-4 overflow-y-auto">
                    <CompUnitInfoCard unit={selectedUnit} />
                </div>
            </div>

            {/* Footer */}
            <div className="h-16 border-t border-gray-border flex items-center justify-center bg-gray-50">
                <span className="text-sm text-gray-500">Legend (to be implemented)</span>
            </div>
        </div>
    );
};

export default DashboardV2;