// ClassInstance.ts
import type { JavaFileType } from './JavaFileType';
import type { LayerAnnotation } from './LayerAnnotation';
import type { ConstructorInstance } from './ConstructorInstance';
import type { MethodInstance } from './MethodInstance';
import type { StatementInstance } from './StatementInstance';
import type { VariableInstance } from './VariableInstance';
import type { GenericUsageInstance } from './GenericUsageInstance';
import type { ExceptionHandlingInstance } from './ExceptionHandlingInstance';

export interface ClassInstance {
    // --- Identity ---
    name: string;
    javaFileType: JavaFileType;
    layerAnnotation: LayerAnnotation | null;

    // --- Inheritance & Interfaces ---
    superClasses: string[];
    implementedInterfaces: string[];

    // --- Annotations on the type ---
    annotations: string[];

    // --- Members ---
    constructors: ConstructorInstance[];
    methods: MethodInstance[];
    statements: StatementInstance[];
    classVariables: VariableInstance[];
    innerClasses: ClassInstance[];

    // --- Dependencies within the class ---
    usedClasses: string[];
    classDependencies: string[];
    dependentClasses: string[];
    genericUsages: GenericUsageInstance[];

    // --- Exception handling blocks (try/catch) ---
    exceptionHandling: ExceptionHandlingInstance[];

    // --- Metrics ---
    linesOfCode: number;
}