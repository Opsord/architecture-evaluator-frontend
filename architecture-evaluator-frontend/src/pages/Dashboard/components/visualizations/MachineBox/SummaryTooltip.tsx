import React from "react";
import type { CompUnitSummaryDTO } from "../../../../../types/compilation-unit.summary";

interface Props {
    summary: CompUnitSummaryDTO;
}

const CompUnitSummaryTooltip: React.FC<Props> = ({ summary }) => (
    <div className="absolute z-10 left-1/2 -translate-x-1/2 -translate-y-full top-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm text-gray-800">
        <h4 className="font-semibold text-lg text-gray-900 mb-2">{summary.className}</h4>
        <ul className="space-y-1">
            <li>
                <span className="font-medium">Lines of Code:</span> {summary.linesOfCode}
            </li>
            <li>
                <span className="font-medium">Methods:</span> {summary.methods.length}
            </li>
            {summary.annotationDTOS && summary.annotationDTOS.length > 0 && (
                <li>
                    <span className="font-medium">Annotations:</span> {summary.annotationDTOS.map(a => a.name).join(", ")}
                </li>
            )}
        </ul>
    </div>
);

export default CompUnitSummaryTooltip;