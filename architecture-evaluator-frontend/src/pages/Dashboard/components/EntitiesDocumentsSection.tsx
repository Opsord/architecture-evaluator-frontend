// src/pages/Dashboard/components/EntitiesDocumentsSection.tsx
import React from "react";
import BoxMachine from "./visualizations/MachineBox/BoxMachine";
import type { CompUnitWithAnalysisDTO } from "../../../types/project-analysis";

interface Props {
    entities: CompUnitWithAnalysisDTO[];
    documents: CompUnitWithAnalysisDTO[];
}

const sortByLoc = (arr: CompUnitWithAnalysisDTO[]) =>
    [...arr].sort((a, b) => b.compUnitSummaryDTO.linesOfCode - a.compUnitSummaryDTO.linesOfCode);

const EntitiesDocumentsSection: React.FC<Props> = ({ entities, documents }) => {
    if (entities.length === 0 && documents.length === 0) return null;
    return (
        <div className="flex gap-8 mb-8">
            {entities.length > 0 && (
                <div className="flex-1 layer-section">
                    <h2>Entities</h2>
                    <div className="flex flex-wrap gap-6 justify-center">
                        {sortByLoc(entities).map((unit, idx) => (
                            <BoxMachine key={idx} unit={unit} />
                        ))}
                    </div>
                </div>
            )}
            {documents.length > 0 && (
                <div className="flex-1 layer-section">
                    <h2>Documents</h2>
                    <div className="flex flex-wrap gap-6 justify-center">
                        {sortByLoc(documents).map((unit, idx) => (
                            <BoxMachine key={idx} unit={unit} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EntitiesDocumentsSection;