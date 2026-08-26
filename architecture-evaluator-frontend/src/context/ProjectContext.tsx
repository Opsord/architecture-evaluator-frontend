import React, { createContext, useContext, useEffect, useState } from "react";
import type { ProjectAnalysisDTO } from "../types/ProjectAnalysisInstance.ts";

interface ProjectContextType {
    projectData: ProjectAnalysisDTO | null;
    setProjectData: (data: ProjectAnalysisDTO) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projectData, setProjectDataState] = useState<ProjectAnalysisDTO | null>(null);

    useEffect(() => {
        if (!import.meta.env.DEV) {
            return;
        }
        void import("../services/MockData/response-zip.json").then((module) => {
            setProjectDataState(module.default as unknown as ProjectAnalysisDTO);
        });
    }, []);

    const setProjectData = (data: ProjectAnalysisDTO) => {
        setProjectDataState(data);
    };

    return (
        <ProjectContext.Provider value={{ projectData, setProjectData }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjectContext = (): ProjectContextType => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProjectContext must be used within a ProjectProvider");
    }
    return context;
};
