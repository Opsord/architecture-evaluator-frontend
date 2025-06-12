// ProjectAnalysisDTO.ts
import type { ProcessedClassInstance } from "./ProcessedClassInstance.ts";
import type { PomFileDTO } from "./PomFileInstance.ts";

// --------------------------------------------------
// ProjectAnalysisDTO
// --------------------------------------------------
export interface ProjectAnalysisDTO {
    projectName: string;
    entities: ProcessedClassInstance[];
    documents: ProcessedClassInstance[];
    repositories: ProcessedClassInstance[];
    services: ProcessedClassInstance[];
    controllers: ProcessedClassInstance[];
    testClasses: ProcessedClassInstance[];
    otherClasses: ProcessedClassInstance[];
    pomFile: PomFileDTO;
}