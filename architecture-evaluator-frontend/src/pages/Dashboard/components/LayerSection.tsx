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
    return (
        <div className="layer-section">
            <h2>{title}</h2>
            <div className="layer-boxes">
                {units.map((unit, idx) => (
                    <BoxMachine key={idx} unit={unit} />
                ))}
            </div>
        </div>
    );
};

export default LayerSection;