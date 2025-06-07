// AnalysedCompUnitDTO.ts

// Import categories enum
export const ImportCategory = {
    PARENT_DEPENDENCY: "PARENT_DEPENDENCY",
    JAVA_STANDARD: "JAVA_STANDARD",
    SPRING: "SPRING",
    INTERNAL: "INTERNAL",
    EXTERNAL_KNOWN: "EXTERNAL_KNOWN",
    EXTERNAL_UNKNOWN: "EXTERNAL_UNKNOWN"
} as const;
export type ImportCategory = (typeof ImportCategory)[keyof typeof ImportCategory];

// --------------------------------------------------
// Program Metrics
// --------------------------------------------------
export interface ProgramMetricsDTO {
    numberOfMethods: number;
    sumOfExecutableStatements: number;
    maxInputParameters: number;
    maxOutputParameters: number;
    linesOfCode: number;
}

// --------------------------------------------------
// Complexity Metrics
// --------------------------------------------------
export interface ComplexityMetricsDTO {
    /**
     * Cyclomatic Complexity (CC) = E - N + 2P
     * where:
     * E = number of edges in the control flow graph
     * N = number of nodes in the control flow graph
     * P = number of connected components (usually 1 for a single method)
     */
    approxMcCabeCC: number;

    /**
     * Improved Cyclomatic Complexity (ICC_p) = (N + S + I + O) / LOC
     * where:
     * N = number of methods
     * S = sum of executable statements
     * I = maximum number of input parameters
     * O = maximum number of output parameters
     * LOC = total lines of code
     */
    improvedCC: number;
}

// --------------------------------------------------
// Coupling Metrics
// --------------------------------------------------
export interface CouplingMetricsDTO {
    afferentCoupling: number; // Ca: number of classes that depend on this class
    efferentCoupling: number; // Ce: number of classes that this class depends on
    instability: number;      // I = Ce / (Ca + Ce)
}

// --------------------------------------------------
// Cohesion Metrics
// --------------------------------------------------
export interface CohesionMetricsDTO {
    lackOfCohesion1: number;
    lackOfCohesion2: number; // Range: 0-1, where 0 means perfect cohesion
    lackOfCohesion3: number;
    lackOfCohesion4: number;
    lackOfCohesion5: number; // Range: 0-1, where 0 means perfect cohesion
}

// --------------------------------------------------
// Main DTO
// --------------------------------------------------
export interface AnalysedCompUnitDTO {
    classCount: number;
    interfaceCount: number;
    statementCount: number;

    classifiedDependencies: Record<ImportCategory, string[]>;

    programMetrics: ProgramMetricsDTO;
    complexityMetrics: ComplexityMetricsDTO;
    couplingMetrics: CouplingMetricsDTO;
    cohesionMetrics: CohesionMetricsDTO;
}