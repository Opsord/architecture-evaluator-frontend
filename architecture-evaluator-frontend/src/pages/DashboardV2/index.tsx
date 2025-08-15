import React, { useState } from "react";
import { useProjectContext } from "../../context/ProjectContext";
import CompUnitsScene from "./components/canvas/CompUnitsScene.tsx";
import ProcessedClassInfoCard from "./components/info/ProcessedClassInfoCard.tsx";
import DashboardLegend from "./components/legend/DashboardLegend.tsx";
import CanvasNavigationTips from "./components/navigation/CanvasNavigationTips.tsx";
import type { ProcessedClassInstance } from "../../types/ProcessedClassInstance.ts";

const DashboardV2: React.FC = () => {
    const { projectData } = useProjectContext();
    const [selectedCube, setSelectedCube] = useState<string | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<ProcessedClassInstance | null>(null);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);

    if (!projectData) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-500">
                No data available. Please analyze a project first.
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col min-h-0 h-full">
            <div className="grid grid-cols-5 grid-rows-8 gap-4 flex-1 min-h-0">
                {/* 1. Legend (Left sidebar) */}
                <div className="row-span-8 bg-white rounded-xl shadow p-0 flex">
                    <DashboardLegend />
                </div>

                {/* 2. Canvas Scene (Main area) */}
                <div className="col-span-3 row-span-7 col-start-2 row-start-2 bg-white rounded-xl shadow overflow-hidden flex">
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

                {/* 3. Vibration Toggle (Top right) */}
                <div className="col-start-5 row-start-1 bg-white rounded-xl shadow p-3 flex flex-row items-center justify-center gap-2 min-h-[56px]">
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
                        <span className="ml-2 text-sm text-gray-700 select-none">Vibration</span>
                    </label>
                </div>

                {/* 4. Info Card (Right sidebar) */}
                <div className="row-span-7 col-start-5 row-start-2 bg-white rounded-xl shadow p-4 h-full flex flex-col overflow-y-auto">
                    <ProcessedClassInfoCard unit={selectedUnit} />
                </div>

                {/* 6. Canvas Navigation Tips (Top bar) */}
                <div className="col-span-3 col-start-2 row-start-1 bg-gradient-to-r from-background-light to-swamp-100 rounded-xl shadow border border-gray-border">
                    <CanvasNavigationTips />
                </div>
            </div>
        </div>
    );
};

export default DashboardV2;