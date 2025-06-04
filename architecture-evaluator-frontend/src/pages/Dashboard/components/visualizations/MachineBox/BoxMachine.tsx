import React, { useState } from "react";
import type { CompUnitWithAnalysisDTO } from "../../../../../types/project-analysis.ts";
import CompUnitSummaryTooltip from "./SummaryTooltip.tsx";
import ComplexityGear from "./ComplexityGear.tsx";

interface BoxMachineProps {
    unit: CompUnitWithAnalysisDTO;
}

const BoxMachine: React.FC<BoxMachineProps> = ({ unit }) => {
    const [hovered, setHovered] = useState(false);
    const summary = unit.compUnitSummaryDTO;

    // Helper to calculate an average cohesion metric
    const calculateAverageCohesion = () => {
        const { lackOfCohesion2, lackOfCohesion5 } = unit.analysis.cohesionMetrics;
        return (lackOfCohesion2 + lackOfCohesion5) / 2;
    };
    const averageCohesion = calculateAverageCohesion();
    // Map 0 (together) to 32 (separated)
    const minGap = 0;
    const maxGap = 16;
    const gearGap = minGap + (maxGap - minGap) * averageCohesion;

    // Helper to scale complexity to a radius (min 8, max 16)
    const getRadius = (complexity: number) => {
        const minRadius = 8;
        const maxRadius = 36;
        return Math.max(minRadius, Math.min(maxRadius, complexity + minRadius));
    };

    // Map complexity to color: green (#39c6c8) to red (#e53935), black if over max
    const getColor = (complexity: number) => {
        const min = 1;
        const max = 10; // set your max threshold
        if (complexity > max) return "#000";
        // Interpolate between green and red
        const percent = (complexity - min) / (max - min);
        const r = Math.round(57 + (229 - 57) * percent);   // 57 (green) to 229 (red)
        const g = Math.round(198 + (57 - 198) * percent);  // 198 (green) to 57 (red)
        const b = Math.round(200 + (53 - 200) * percent);  // 200 (green) to 53 (red)
        return `rgb(${r},${g},${b})`;
    };

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
            <div
                className="flex relative"
                style={{ gap: `${gearGap}px` }}
            >
                {summary.methods.map((method, idx) => (
                    <span key={idx} title={method.name}>
                <ComplexityGear
                    radius={getRadius(method.mcCabeComplexity)}
                    color={getColor(method.mcCabeComplexity)}
                />
            </span>
                ))}
            </div>
            {hovered && <CompUnitSummaryTooltip summary={summary} />}
        </div>
    );
};

export default BoxMachine;