// src/pages/Dashboard/components/LayerSection.tsx
import React from "react";
import BoxMachine from "./visualizations/MachineBox/BoxMachine";
import type { CompUnitWithAnalysisDTO } from "../../../types/project-analysis";

interface LayerSectionProps {
    title: string;
    units: CompUnitWithAnalysisDTO[];
}

const LayerSection: React.FC<LayerSectionProps> = ({ title, units }) => {
    if (!units || units.length === 0) return null;

    // Sort by lines of code descending
    const sortedUnits = [...units].sort(
        (a, b) => b.compUnitSummaryDTO.linesOfCode - a.compUnitSummaryDTO.linesOfCode
    );

    return (
        <section className="mb-8 bg-white border border-swamp-200 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-center text-swamp-900 mb-4">{title}</h2>
            <div className="flex flex-wrap gap-6 justify-center">
                {sortedUnits.map((unit, idx) => (
                    <BoxMachine key={idx} unit={unit} />
                ))}
            </div>
        </section>
    );
};

export default LayerSection;