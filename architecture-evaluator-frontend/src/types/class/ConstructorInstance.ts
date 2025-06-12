import type {ParameterInstance} from "./ParameterInstance.ts";

export interface ConstructorInstance {
    name: string;
    parameters: ParameterInstance[];
    annotations: string[];
    modifiers: string[];
    thrownExceptions: string[];
    body: string;
    lineCount: number;
    comments: string[];
}