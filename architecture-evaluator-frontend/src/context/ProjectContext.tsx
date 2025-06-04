// --------------------------------------------------
// Imports
// --------------------------------------------------
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ProjectAnalysisDTO } from "../types/project-analysis";
import mockData from "../services/MockData/response-zip.json";

// --------------------------------------------------
// Constants
// --------------------------------------------------
const LOCAL_STORAGE_KEY = "projectData";

// --------------------------------------------------
// Context Type Definition
// --------------------------------------------------
interface ProjectContextType {
    projectData: ProjectAnalysisDTO | null;
    setProjectData: (data: ProjectAnalysisDTO) => void;
}

// --------------------------------------------------
// Context Creation
// --------------------------------------------------
const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// --------------------------------------------------
// Provider Component
// --------------------------------------------------
export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projectData, setProjectDataState] = useState<ProjectAnalysisDTO | null>(null);

    // ----------------------------------------------
    // Load from localStorage or mockData on mount
    // ----------------------------------------------
    useEffect(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
            setProjectDataState(JSON.parse(stored));
        } else {
            setProjectDataState(mockData as unknown as ProjectAnalysisDTO);
        }
    }, []);

    // ----------------------------------------------
    // Save to localStorage on change
    // ----------------------------------------------
    const setProjectData = (data: ProjectAnalysisDTO) => {
        try {
            setProjectDataState(data);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error("Failed to update project data:", error);
            alert("An error occurred while updating the project data. Please try again.");
        }
    };

    return (
        <ProjectContext.Provider value={{ projectData, setProjectData }}>
            {children}
        </ProjectContext.Provider>
    );
};

// --------------------------------------------------
// Custom Hook
// --------------------------------------------------
export const useProjectContext = (): ProjectContextType => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProjectContext must be used within a ProjectProvider");
    }
    return context;
};