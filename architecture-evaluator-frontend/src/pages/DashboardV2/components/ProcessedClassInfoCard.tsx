import React from "react";
import type { ProcessedClassInstance } from "../../../types/ProcessedClassInstance.ts";

const metricDescriptions = {
    linesOfCode: "Lines of Code: Total number of lines in this class.",
    numberOfMethods: "Number of Methods: Total methods defined in this class.",
    sumOfExecutableStatements: "Statements: Number of executable statements.",
    approxMcCabeCC: "Cyclomatic Complexity: Measures the number of linearly independent paths.",
    improvedCC: "Improved CC: Enhanced cyclomatic complexity metric.",
    afferentCoupling: "Afferent Coupling (Ca): Number of classes that depend on this class.",
    efferentCoupling: "Efferent Coupling (Ce): Number of classes this class depends on.",
    instability: "Instability: Ce / (Ca + Ce), ranges from 0 (stable) to 1 (unstable).",
    lackOfCohesion1: "LCOM1: Lack of Cohesion metric 1.",
    lackOfCohesion2: "LCOM2: Lack of Cohesion metric 2.",
    lackOfCohesion3: "LCOM3: Lack of Cohesion metric 3.",
    lackOfCohesion4: "LCOM4: Lack of Cohesion metric 4.",
    lackOfCohesion5: "LCOM5: Lack of Cohesion metric 5.",
};

const LabelWithTooltip: React.FC<{ label: string; description: string }> = ({ label, description }) => (
    <span className="flex items-center gap-1">
        {label}
        <span
            className="text-xs text-gray-400 cursor-help"
            title={description}
            style={{ borderBottom: "1px dotted #888" }}
        >
            ?
        </span>
    </span>
);

const ProcessedClassInfoCard: React.FC<{ unit: ProcessedClassInstance | null }> = ({ unit }) => {
    if (!unit) {
        return (
            <div className="flex items-center justify-center h-full text-gray-400">
                Select a class to see details.
            </div>
        );
    }

    const classInstance = unit.classInstance ?? {};
    const classLayerAnnotation = classInstance.layerAnnotation ?? "UNKNOWN";
    const analysis = unit.classAnalysis ?? {};
    const programMetrics = analysis.programMetrics ?? {};
    const complexityMetrics = analysis.complexityMetrics ?? {};
    const couplingMetrics = analysis.couplingMetrics ?? {};
    const cohesionMetrics = analysis.cohesionMetrics ?? {};

    return (
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-7 text-[15px] h-full flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="mb-5">
                <div className="text-2xl font-bold text-swamp-900">{classInstance.name ?? ""}</div>
                <div className="text-[15px] font-semibold text-primary">{classLayerAnnotation}</div>
            </div>

            {/* Program Metrics */}
            <div className="mb-5 pb-2 border-b border-gray-border">
                <div className="text-primary font-semibold text-xs mb-2 tracking-wide">Program Metrics</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <LabelWithTooltip label="LOC:" description={metricDescriptions.linesOfCode} />
                    <div className="font-medium">{programMetrics.linesOfCode ?? classInstance.linesOfCode ?? 0}</div>
                    <LabelWithTooltip label="Methods:" description={metricDescriptions.numberOfMethods} />
                    <div className="font-medium">{programMetrics.numberOfMethods ?? classInstance.methods?.length ?? 0}</div>
                    <LabelWithTooltip label="Statements:" description={metricDescriptions.sumOfExecutableStatements} />
                    <div className="font-medium">{programMetrics.sumOfExecutableStatements ?? classInstance.statements?.length ?? 0}</div>
                </div>
            </div>

            {/* Complexity */}
            <div className="mb-5 pb-2 border-b border-gray-border">
                <div className="text-primary font-semibold text-xs mb-2 tracking-wide">Complexity</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <LabelWithTooltip label="CC:" description={metricDescriptions.approxMcCabeCC} />
                    <div className="font-medium">{complexityMetrics.approxMcCabeCC ?? 0}</div>
                    <LabelWithTooltip label="Improved CC:" description={metricDescriptions.improvedCC} />
                    <div className="font-medium">
                        {typeof complexityMetrics.improvedCC === "number"
                            ? complexityMetrics.improvedCC.toFixed(3)
                            : "0.000"}
                    </div>
                </div>
            </div>

            {/* Coupling */}
            <div className="mb-5 pb-2 border-b border-gray-border">
                <div className="text-primary font-semibold text-xs mb-2 tracking-wide">Coupling</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <LabelWithTooltip label="Ca (Afferent):" description={metricDescriptions.afferentCoupling} />
                    <div className="font-medium">{couplingMetrics.afferentCoupling ?? 0}</div>
                    <LabelWithTooltip label="Ce (Efferent):" description={metricDescriptions.efferentCoupling} />
                    <div className="font-medium">{couplingMetrics.efferentCoupling ?? 0}</div>
                    <LabelWithTooltip label="Instability:" description={metricDescriptions.instability} />
                    <div className="font-medium">
                        {typeof couplingMetrics.instability === "number"
                            ? couplingMetrics.instability.toFixed(3)
                            : "0.000"}
                    </div>
                </div>
            </div>

            {/* Cohesion */}
            <div className="mb-5 pb-2 border-b border-gray-border">
                <div className="text-primary font-semibold text-xs mb-2 tracking-wide">Cohesion</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <LabelWithTooltip label="LCOM1:" description={metricDescriptions.lackOfCohesion1} />
                    <div className="font-medium">{cohesionMetrics.lackOfCohesion1 ?? 0}</div>
                    <LabelWithTooltip label="LCOM2:" description={metricDescriptions.lackOfCohesion2} />
                    <div className="font-medium">{cohesionMetrics.lackOfCohesion2 ?? 0}</div>
                    <LabelWithTooltip label="LCOM3:" description={metricDescriptions.lackOfCohesion3} />
                    <div className="font-medium">{cohesionMetrics.lackOfCohesion3 ?? 0}</div>
                    <LabelWithTooltip label="LCOM4:" description={metricDescriptions.lackOfCohesion4} />
                    <div className="font-medium">{cohesionMetrics.lackOfCohesion4 ?? 0}</div>
                    <LabelWithTooltip label="LCOM5:" description={metricDescriptions.lackOfCohesion5} />
                    <div className="font-medium">{cohesionMetrics.lackOfCohesion5 ?? 0}</div>
                </div>
            </div>

            {/* Dependencies */}
            <div>
                <div className="text-primary font-semibold text-xs mb-2 tracking-wide">Dependencies</div>
                <div className="flex flex-wrap gap-2 mb-3">
                    {(classInstance.dependentClasses?.length ?? 0) > 0
                        ? classInstance.dependentClasses.map((dep: string) => (
                            <span
                                key={dep}
                                className="bg-bright-turquoise-100 text-bright-turquoise-800 px-2 py-0.5 rounded-full text-xs font-medium border border-bright-turquoise-200 shadow-sm"
                            >
                    {dep}
                </span>
                        ))
                        : <span className="text-gray-400 italic">No dependencies</span>
                    }
                </div>
                <div className="text-primary font-semibold text-xs mb-2 tracking-wide">Depends on:</div>
                <div className="flex flex-wrap gap-2">
                    {(classInstance.classDependencies?.length ?? 0) > 0
                        ? classInstance.classDependencies.map((dep: string) => (
                            <span
                                key={dep}
                                className="bg-swamp-100 text-swamp-800 px-2 py-0.5 rounded-full text-xs font-medium border border-swamp-200 shadow-sm"
                            >
                    {dep}
                </span>
                        ))
                        : <span className="text-gray-400 italic">No dependencies</span>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProcessedClassInfoCard;