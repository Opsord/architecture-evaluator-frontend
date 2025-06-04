// ProjectAnalysisDTO.ts

// Import previously defined types
import type { CompUnitSummaryDTO } from "./compilation-unit.summary.ts";
import type { AnalysedCompUnitDTO } from "./compilation-unit-analysis.ts";
import type { PomFileDTO } from "./pom.ts";

// --------------------------------------------------
// CompUnitWithAnalysisDTO
// --------------------------------------------------
export interface CompUnitWithAnalysisDTO {
    compUnitSummaryDTO: CompUnitSummaryDTO;
    analysis: AnalysedCompUnitDTO;
}

// --------------------------------------------------
// ProjectAnalysisDTO
// --------------------------------------------------
export interface ProjectAnalysisDTO {
    projectPath: string;
    entities: CompUnitWithAnalysisDTO[];
    documents: CompUnitWithAnalysisDTO[];
    repositories: CompUnitWithAnalysisDTO[];
    services: CompUnitWithAnalysisDTO[];
    controllers: CompUnitWithAnalysisDTO[];
    testClasses: CompUnitWithAnalysisDTO[];
    otherClasses: CompUnitWithAnalysisDTO[];
    pomFile: PomFileDTO;
}