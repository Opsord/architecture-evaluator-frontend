// ProcessedClassInstance.ts
import type { ClassInstance } from './class/ClassInstance.ts';
import type { ClassAnalysisInstance } from './analysis/ClassAnalysisInstance.ts';

export interface ProcessedClassInstance {
    classInstance: ClassInstance;
    classAnalysisInstance: ClassAnalysisInstance;
}