import React, { useState } from "react";
import type { CompUnitWithAnalysisDTO } from "../../../../../types/project-analysis.ts";
import CompUnitSummaryTooltip from "./SummaryTooltip.tsx";

interface BoxMachineProps {
    unit: CompUnitWithAnalysisDTO;
}

const BoxMachine: React.FC<BoxMachineProps> = ({ unit }) => {
    const [hovered, setHovered] = useState(false);
    const summary = unit.compUnitSummaryDTO;

    return (
        <div
            className="relative rounded-lg border border-swamp-200 bg-swamp-50 shadow-sm p-4 m-2 transition-transform hover:-translate-y-1 hover:shadow-lg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <h3 className="text-lg font-semibold text-swamp-900 mb-2">
                {summary.className}
            </h3>
            <p className="text-sm text-swamp-700">
                Lines of code: {summary.linesOfCode}
            </p>
            {hovered && <CompUnitSummaryTooltip summary={summary} />}
        </div>
    );
};

export default BoxMachine;