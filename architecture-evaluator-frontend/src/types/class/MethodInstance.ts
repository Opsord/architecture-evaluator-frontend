import type { ParameterInstance } from "./ParameterInstance";
import type { VariableInstance } from "./VariableInstance";
import type {StatementInstance} from "./StatementInstance.ts";

export interface BasicInfo {
    accessModifier: string;
    returnType: string;
}

export interface MethodMetrics {
    linesOfCode: number;
    mcCabeComplexity: number;
}

export interface StatementsInfo {
    numberOfStatements: number;
    numberOfExecutableStatements: number;
    numberOfControlStatements: number;
    statements: StatementInstance[];
}

export interface MethodInstance {
    name: string;
    basicInfo: BasicInfo;
    statementsInfo: StatementsInfo;
    inputParameters: ParameterInstance[];
    outputParameters: ParameterInstance[];
    methodMetrics: MethodMetrics;
    methodVariables: VariableInstance[];
}