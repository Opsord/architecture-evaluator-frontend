// src/models/GradleFileInstance.ts

export interface GradleDependencyInstance {
    group: string;
    name: string;
    version: string;
}

export interface GradleFileInstance {
    group: string | null;
    name: string | null;
    version: string | null;
    description: string | null;
    javaVersion: string | null;
    dependencies: GradleDependencyInstance[];
}