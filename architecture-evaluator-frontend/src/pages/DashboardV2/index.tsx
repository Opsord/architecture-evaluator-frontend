import React, { useState } from "react";
import { useProjectContext } from "../../context/ProjectContext";
import CompUnitsScene from "./components/CompUnitsScene";
import CompUnitInfoCard from "./components/CompUnitInfoCard";
import type { CompUnitWithAnalysisDTO } from "../../types/project-analysis";

const DashboardV2: React.FC = () => {
    const { projectData } = useProjectContext();
    const [selectedCube, setSelectedCube] = useState<string | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<CompUnitWithAnalysisDTO | null>(null);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);


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
                        vibrationEnabled={vibrationEnabled}
                    />
                </div>

                {/* Info Card */}
                <div className="w-96 bg-white border-l border-gray-border p-4 overflow-y-auto">
                    <div className="mb-3 flex items-center">
                        <label htmlFor="vibration-toggle" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="vibration-toggle"
                                    checked={vibrationEnabled}
                                    onChange={e => setVibrationEnabled(e.target.checked)}
                                    className="sr-only"
                                />
                                <div className={`block w-10 h-6 rounded-full transition-colors duration-200 ${vibrationEnabled ? "bg-swamp-500" : "bg-gray-300"}`}></div>
                                <div
                                    className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform duration-200 ${vibrationEnabled ? "translate-x-4" : ""}`}
                                ></div>
                            </div>
                            <span className="ml-3 text-sm text-gray-700 select-none">Enable vibration effect</span>
                        </label>
                    </div>
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