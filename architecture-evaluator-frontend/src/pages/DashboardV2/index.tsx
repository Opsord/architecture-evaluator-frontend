import React, { useState } from "react";
import { useProjectContext } from "../../context/ProjectContext";
import CompUnitsScene from "./components/canvas/CompUnitsScene.tsx";
import ProcessedClassInfoCard from "./components/info/ProcessedClassInfoCard.tsx";
import DashboardLegend from "./components/legend/DashboardLegend.tsx";
import type { ProcessedClassInstance } from "../../types/ProcessedClassInstance.ts";

const DashboardV2: React.FC = () => {
    const { projectData } = useProjectContext();
    const [selectedCube, setSelectedCube] = useState<string | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<ProcessedClassInstance | null>(null);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);
    const [legendVisible, setLegendVisible] = useState(true);

    if (!projectData) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-500">
                No data available. Please analyze a project first.
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col min-h-0">
            <div className="grid grid-cols-4 grid-rows-8 gap-4 flex-1 min-h-0">
                {/* 1. Canvas Scene */}
                <div className="col-span-3 row-span-8 bg-white rounded-xl shadow overflow-hidden flex">
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
                {/* 2. Options */}
                <div className="col-start-4 bg-white rounded-xl shadow p-3 flex flex-row items-center justify-center gap-2 min-h-[56px]">
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
                    {!legendVisible && (
                        <button
                            onClick={() => setLegendVisible(true)}
                            className="px-3 py-1 bg-bright-turquoise-100 text-bright-turquoise-800 rounded-full border border-bright-turquoise-200 shadow hover:bg-bright-turquoise-200 font-semibold transition text-sm"
                            type="button"
                        >
                            Show Legend
                        </button>
                    )}
                </div>
                {/* 3. Info Card */}
                <div
                    className={
                        legendVisible
                            ? "row-span-4 col-start-4 row-start-2 bg-white rounded-xl shadow p-4 h-full flex flex-col overflow-y-auto"
                            : "row-span-7 col-start-4 row-start-2 bg-white rounded-xl shadow p-4 h-full flex flex-col overflow-y-auto"
                    }
                >
                    <ProcessedClassInfoCard unit={selectedUnit} />
                </div>
                {/* 4. Legend */}
                {legendVisible && (
                    <div className="row-span-3 col-start-4 row-start-6 bg-white rounded-xl shadow p-0 flex">
                        <DashboardLegend onClose={() => setLegendVisible(false)} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardV2;