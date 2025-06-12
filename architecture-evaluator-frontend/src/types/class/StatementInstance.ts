export const StatementType = {
    IF: 'IF',
    FOR: 'FOR',
    WHILE: 'WHILE',
    SWITCH: 'SWITCH',
    EXPRESSION: 'EXPRESSION',
    RETURN: 'RETURN',
    THROW: 'THROW',
    TRY: 'TRY'
} as const;

export type StatementType = (typeof StatementType)[keyof typeof StatementType];

export interface StatementInstance {
    type: StatementType;
    structure: string;
}