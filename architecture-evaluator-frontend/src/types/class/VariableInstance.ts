export interface VariableInstance {
    name: string;
    type: string;
    scope: string; // "instance" or "local"
}