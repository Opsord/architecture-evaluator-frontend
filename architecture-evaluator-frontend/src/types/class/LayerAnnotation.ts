export const LayerAnnotation = {
    CONTROLLER: 'CONTROLLER',
    SERVICE: 'SERVICE',
    REPOSITORY: 'REPOSITORY',
    ENTITY: 'ENTITY',
    DOCUMENT: 'DOCUMENT',
    OTHER: 'OTHER',
    TESTING: 'TESTING',
    UNKNOWN: 'UNKNOWN'
} as const;

export type LayerAnnotation = (typeof LayerAnnotation)[keyof typeof LayerAnnotation];