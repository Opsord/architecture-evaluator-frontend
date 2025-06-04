// src/pages/Dashboard/components/LayerSection.tsx
import React from "react";
import BoxMachine from "./visualizations/MachineBox/BoxMachine";
import type { CompUnitWithAnalysisDTO } from "../../../types/project-analysis";

interface LayerSectionProps {
    title: string;
    units: CompUnitWithAnalysisDTO[];
}

// Helper to center the largest and alternate left/right
function centerLargest(units: CompUnitWithAnalysisDTO[]) {
    const sorted = [...units].sort(
        (a, b) => b.compUnitSummaryDTO.linesOfCode - a.compUnitSummaryDTO.linesOfCode
    );
    const result: CompUnitWithAnalysisDTO[] = [];
    let left: CompUnitWithAnalysisDTO[] = [];
    let right: CompUnitWithAnalysisDTO[] = [];
    sorted.forEach((unit, idx) => {
        if (idx === 0) {
            result.push(unit); // center
        } else if (idx % 2 === 1) {
            right.push(unit);
        } else {
            left.unshift(unit);
        }
    });
    return [...left, ...result, ...right];
}

const LayerSection: React.FC<LayerSectionProps> = ({ title, units }) => {
    if (!units || units.length === 0) return null;

    const centeredUnits = centerLargest(units);

    return (
        <section className="mb-8 bg-white border border-swamp-200 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-center text-swamp-900 mb-4">{title}</h2>
            <div className="flex flex-wrap gap-6 justify-center">
                {centeredUnits.map((unit, idx) => (
                    <BoxMachine key={idx} unit={unit} />
                ))}
            </div>
        </section>
    );
};

export default LayerSection;