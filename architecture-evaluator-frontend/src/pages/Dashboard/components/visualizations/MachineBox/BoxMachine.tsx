import React from "react";
import type { CompUnitWithAnalysisDTO } from "../../../../../types/project-analysis.ts";

interface BoxMachineProps {
    unit: CompUnitWithAnalysisDTO;
}

const BoxMachine: React.FC<BoxMachineProps> = ({ unit }) => (
    <div
        className="rounded-lg border border-swamp-200 bg-swamp-50 shadow-sm p-4 m-2 transition-transform hover:-translate-y-1 hover:shadow-lg"
    >
        <h3 className="text-lg font-semibold text-swamp-900 mb-2">
            {unit.compUnitSummaryDTO.className}
        </h3>
        <p className="text-sm text-swamp-700">
            Lines of code: {unit.compUnitSummaryDTO.linesOfCode}
        </p>
    </div>
);

export default BoxMachine;