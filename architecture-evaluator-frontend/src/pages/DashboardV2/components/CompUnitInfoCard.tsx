import React from "react";
import type { ProcessedClassInstance } from "../../../types/ProcessedClassInstance.ts";

function inferType(className: string) {
    const name = className?.toLowerCase?.() ?? "";
    if (name.includes("controller")) return "Controller";
    if (name.includes("service")) return "Service";
    if (name.includes("repo")) return "Repository";
    if (name.includes("entity")) return "Entity";
    if (name.includes("test")) return "Test Class";
    return "Class";
}

const CompUnitInfoCard: React.FC<{ unit: ProcessedClassInstance | null }> = ({ unit }) => {
    if (!unit) {
        return (
            <div className="flex items-center justify-center h-full text-gray-400">
                Select a class to see details.
            </div>
        );
    }

    const classInstance = unit.classInstance ?? {};
    const analysis = unit.classAnalysis ?? {};
    const programMetrics = analysis.programMetrics ?? {};
    const complexityMetrics = analysis.complexityMetrics ?? {};
    const couplingMetrics = analysis.couplingMetrics ?? {};
    const cohesionMetrics = analysis.cohesionMetrics ?? {};

    return (
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-7 text-[15px] min-h-[420px] max-h-[80vh] overflow-y-auto sticky top-8">
            {/* Header */}
            <div className="mb-5">
                <div className="text-2xl font-bold text-swamp-900">{classInstance.name ?? ""}</div>
                <div className="text-[15px] font-semibold text-primary">{inferType(classInstance.name ?? "")}</div>
            </div>

            {/* Program Metrics */}
            <div className="mb-5 pb-2 border-b border-gray-border">
                <div className="text-primary font-semibold text-xs mb-2 tracking-wide">Program Metrics</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <div>LOC:</div>
                    <div className="font-medium">{programMetrics.linesOfCode ?? classInstance.linesOfCode ?? 0}</div>
                    <div>Methods:</div>
                    <div className="font-medium">{programMetrics.numberOfMethods ?? classInstance.methods?.length ?? 0}</div>
                    <div>Statements:</div>
                    <div className="font-medium">{programMetrics.sumOfExecutableStatements ?? classInstance.statements?.length ?? 0}</div>
                </div>
            </div>

            {/* Complexity */}
            <div className="mb-5 pb-2 border-b border-gray-border">
                <div className="text-primary font-semibold text-xs mb-2 tracking-wide">Complexity</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <div>CC:</div>
                    <div className="font-medium">{complexityMetrics.approxMcCabeCC ?? 0}</div>
                    <div>Improved CC:</div>
                    <div className="font-medium">{complexityMetrics.improvedCC ?? 0}</div>
                </div>
            </div>

            {/* Coupling */}
            <div className="mb-5 pb-2 border-b border-gray-border">
                <div className="text-primary font-semibold text-xs mb-2 tracking-wide">Coupling</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <div>Ca (Afferent):</div>
                    <div className="font-medium">{couplingMetrics.afferentCoupling ?? 0}</div>
                    <div>Ce (Efferent):</div>
                    <div className="font-medium">{couplingMetrics.efferentCoupling ?? 0}</div>
                    <div>Instability:</div>
                    <div className="font-medium">{typeof couplingMetrics.instability === "number" ? couplingMetrics.instability.toFixed(2) : "0.00"}</div>
                </div>
            </div>

            {/* Cohesion */}
            <div className="mb-5 pb-2 border-b border-gray-border">
                <div className="text-primary font-semibold text-xs mb-2 tracking-wide">Cohesion</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <div>LCOM1:</div>
                    <div className="font-medium">{cohesionMetrics.lackOfCohesion1 ?? 0}</div>
                    <div>LCOM2:</div>
                    <div className="font-medium">{cohesionMetrics.lackOfCohesion2 ?? 0}</div>
                    <div>LCOM3:</div>
                    <div className="font-medium">{cohesionMetrics.lackOfCohesion3 ?? 0}</div>
                    <div>LCOM4:</div>
                    <div className="font-medium">{cohesionMetrics.lackOfCohesion4 ?? 0}</div>
                    <div>LCOM5:</div>
                    <div className="font-medium">{cohesionMetrics.lackOfCohesion5 ?? 0}</div>
                </div>
            </div>

            {/* Dependencies */}
            <div>
                <div className="text-primary font-semibold text-xs mb-2 tracking-wide">Dependencies</div>
                <div className="text-[13px] text-gray-700">
                    {(classInstance.dependentClasses?.length ?? 0) > 0
                        ? classInstance.dependentClasses.join(", ")
                        : <span className="text-gray-400">No dependencies</span>
                    }
                </div>
            </div>
        </div>
    );
};

export default CompUnitInfoCard;