// ProjectAnalysisDTO.ts

// Import previously defined types
import type { CustomCompilationUnitDTO } from "./compilation-unit.ts";
import type { AnalysedCompUnitDTO } from "./analysed-comp-unit.ts";
import type { PomFileDTO } from "./pom.ts";

// --------------------------------------------------
// CompUnitWithAnalysisDTO
// --------------------------------------------------
export interface CompUnitWithAnalysisDTO {
    compilationUnit: CustomCompilationUnitDTO;
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