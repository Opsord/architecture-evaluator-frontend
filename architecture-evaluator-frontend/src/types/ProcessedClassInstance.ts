// ProcessedClassInstance.ts
import type { ClassInstance } from './class/ClassInstance.ts';
import type { ClassAnalysis } from './analysis/ClassAnalysis.ts';

export interface ProcessedClassInstance {
    classInstance: ClassInstance;
    classAnalysis: ClassAnalysis;
}