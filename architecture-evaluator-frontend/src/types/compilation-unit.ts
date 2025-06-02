// CompilationUnit.ts

// ===== Annotation Types =====
export interface AnnotationDTO {
    name: string;
    attributes: Record<string, string>;
}

// ===== Basic Structure Types =====
export interface BasicInfo {
    accessModifier: string;
    returnType: string;
}

export interface Parameters {
    inputs: string[];
    outputs: string[];
}

// ===== Variable Related Types =====
export interface VariableDTO {
    name: string;
    type: string;
    scope: string; // "instance" or "local"
}

// ===== Generic Types =====
export interface GenericUsageDTO {
    type: string;
    genericTypes: string[];
}

// ===== Exception Handling Types =====
export interface ExceptionHandlingDTO {
    tryBlock: string;
    catchBlocks: string[];
    finallyBlock: string;
}

// ===== Statement Types =====
export const StatementType = {
    IF: "IfStmt",
    FOR: "ForStmt",
    WHILE: "WhileStmt",
    SWITCH: "SwitchStmt",
    EXPRESSION: "ExpressionStmt",
    RETURN: "ReturnStmt",
    THROW: "ThrowStmt",
    TRY: "TryStmt"
} as const;
export type StatementType = (typeof StatementType)[keyof typeof StatementType];

export interface StatementDTO {
    type: StatementType;
    structure: string;
}

export interface StatementsInfo {
    numberOfStatements: number;
    numberOfExecutableStatements: number;
    numberOfControlStatements: number;
    statements: StatementDTO[];
}

// ===== Method Types =====
export interface MethodMetrics {
    linesOfCode: number;
}

export interface MethodDTO {
    name: string;
    basicInfo: BasicInfo;
    statementsInfo: StatementsInfo;
    parameters: Parameters;
    methodMetrics: MethodMetrics;
    methodVariables: VariableDTO[];
}

// ===== Compilation Unit Type =====
export interface CustomCompilationUnitDTO {
    packageName: string;
    className: string[];
    interfaceNames: string[];
    statements: StatementDTO[];
    methods: MethodDTO[];
    variables: VariableDTO[];
    importedPackages: string[];
    comments: string[];
    exceptionHandling: ExceptionHandlingDTO[];
    superClasses: string[];
    implementedInterfaces: string[];
    annotations: AnnotationDTO[];
    genericUsages: GenericUsageDTO[];
    linesOfCode: number;
}