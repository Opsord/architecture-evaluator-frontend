// src/pages/Dashboard/components/EntitiesDocumentsSection.tsx
import React from "react";
import BoxMachine from "./visualizations/MachineBox/BoxMachine";
import type { CompUnitWithAnalysisDTO } from "../../../types/project-analysis";

interface Props {
    entities: CompUnitWithAnalysisDTO[];
    documents: CompUnitWithAnalysisDTO[];
}

const EntitiesDocumentsSection: React.FC<Props> = ({ entities, documents }) => {
    if (entities.length === 0 && documents.length === 0) return null;
    return (
        <div className="flex gap-6 mb-8">
            {entities.length > 0 && (
                <div className="flex-1 layer-section">
                    <h2>Entities</h2>
                    <div className="layer-boxes">
                        {entities.map((unit, idx) => (
                            <BoxMachine key={idx} unit={unit} />
                        ))}
                    </div>
                </div>
            )}
            {documents.length > 0 && (
                <div className="flex-1 layer-section">
                    <h2>Documents</h2>
                    <div className="layer-boxes">
                        {documents.map((unit, idx) => (
                            <BoxMachine key={idx} unit={unit} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EntitiesDocumentsSection;