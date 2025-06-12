export interface ParentSection {
    groupId: string;
    artifactId: string;
    version: string;
}

export interface Dependency {
    groupId: string;
    artifactId: string;
    version: string;
}

export interface PomFileDTO {
    parentSection: ParentSection;
    groupId: string;
    artifactId: string;
    version: string;
    description: string;
    url: string;
    license: string;
    developers: string[];
    javaVersion: string;
    dependencies: Dependency[];
}