// ImportCategory.ts
export const ImportCategory = {
    PARENT_DEPENDENCY: "PARENT_DEPENDENCY",
    JAVA_STANDARD: "JAVA_STANDARD",
    SPRING: "SPRING",
    INTERNAL: "INTERNAL",
    EXTERNAL_KNOWN: "EXTERNAL_KNOWN",
    EXTERNAL_UNKNOWN: "EXTERNAL_UNKNOWN"
} as const;

export type ImportCategory = typeof ImportCategory[keyof typeof ImportCategory];