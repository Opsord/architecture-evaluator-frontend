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
                <section className="flex-1 bg-white border border-swamp-200 rounded-xl shadow-md p-6 mb-0">
                    <h2 className="text-2xl font-bold text-center text-swamp-900 mb-4">Entities</h2>
                    <div className="flex flex-wrap gap-6 justify-center">
                        {sortByLoc(entities).map((unit, idx) => (
                            <BoxMachine key={idx} unit={unit} />
                        ))}
                    </div>
                </section>
            )}
            {documents.length > 0 && (
                <section className="flex-1 bg-white border border-swamp-200 rounded-xl shadow-md p-6 mb-0">
                    <h2 className="text-2xl font-bold text-center text-swamp-900 mb-4">Documents</h2>
                    <div className="flex flex-wrap gap-6 justify-center">
                        {sortByLoc(documents).map((unit, idx) => (
                            <BoxMachine key={idx} unit={unit} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default EntitiesDocumentsSection;