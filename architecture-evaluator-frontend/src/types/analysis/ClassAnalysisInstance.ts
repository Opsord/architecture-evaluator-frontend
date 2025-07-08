// ClassAnalysis.ts
import type { ImportCategory } from './ImportCategory';
import type { ProgramMetrics } from './ProgramMetrics';
import type { ComplexityMetrics } from './ComplexityMetrics';
import type { CouplingMetrics } from './CouplingMetrics';
import type { CohesionMetrics } from './CohesionMetrics';

export interface ClassAnalysisInstance {
    classCount: number;
    interfaceCount: number;
    statementCount: number;
    classifiedDependencies: Record<ImportCategory, string[]>;
    programMetrics: ProgramMetrics;
    complexityMetrics: ComplexityMetrics;
    couplingMetrics: CouplingMetrics;
    cohesionMetrics: CohesionMetrics;
}