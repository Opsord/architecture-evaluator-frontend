// CompUnitSummaryDTO.ts

// Import related types
import type { AnnotationDTO } from './compilation-unit.ts';

// --------------------------------------------------
// Method Summary DTO
// --------------------------------------------------
export interface MethodSummaryDTO {
    methodName: string;
    usedVariables: string[];
    returnType: string;
    linesOfCode: number;
    mcCabeComplexity: number;
}

// --------------------------------------------------
// Compilation Unit Summary DTO
// --------------------------------------------------
export interface CompUnitSummaryDTO {
    className: string;
    interfaceNames: string[];
    methods: MethodSummaryDTO[];
    linesOfCode: number;
    annotationDTOS: AnnotationDTO[];
    dependentClasses: string[];
}