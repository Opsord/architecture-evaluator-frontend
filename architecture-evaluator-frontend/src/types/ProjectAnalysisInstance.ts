// ProjectAnalysisDTO.ts
import type { ProcessedClassInstance } from "./ProcessedClassInstance.ts";
import type { PomFileDTO } from "./PomFileInstance.ts";
import type { GradleFileInstance } from "./GradleFileInstance.ts";

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
    gradleFile: GradleFileInstance;
}