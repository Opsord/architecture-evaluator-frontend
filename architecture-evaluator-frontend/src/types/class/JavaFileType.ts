export const JavaFileType = {
    CLASS: "CLASS",
    INTERFACE: "INTERFACE",
    ENUM: "ENUM",
    RECORD: "RECORD",
    ANNOTATION: "ANNOTATION",
    EXCEPTION: "EXCEPTION",
    ABSTRACT_CLASS: "ABSTRACT_CLASS",
    UNKNOWN: "UNKNOWN"
} as const;

export type JavaFileType = (typeof JavaFileType)[keyof typeof JavaFileType];