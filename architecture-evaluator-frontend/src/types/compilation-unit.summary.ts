// CompUnitSummaryDTO.ts

// Import related types
import type { AnnotationDTO } from './compilation-unit.ts';

// --------------------------------------------------
// Method Summary DTO
// --------------------------------------------------
export interface MethodSummaryDTO {
    name: string;
    accessModifier: string;
    returnType: string;
    parametersCount: number;
    linesOfCode: number;
}

// --------------------------------------------------
// Compilation Unit Summary DTO
// --------------------------------------------------
export interface CompUnitSummaryDTO {
    className: string;
    methods: MethodSummaryDTO[];
    linesOfCode: number;
    annotationDTOS: AnnotationDTO[];
}