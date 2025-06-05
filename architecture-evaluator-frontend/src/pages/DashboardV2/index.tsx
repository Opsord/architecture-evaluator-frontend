import React from "react";
import { useProjectContext } from "../../context/ProjectContext";
import CompUnitsScene from "./components/CompUnitsScene.tsx";

const DashboardV2: React.FC = () => {
    const { projectData } = useProjectContext();

    if (!projectData) {
        return <div className="z-0">No data available. Please analyze a project first.</div>;
    }

    return (
        <div style={{ width: "100%", height: "80vh" }}>
            <CompUnitsScene projectData={projectData} />
        </div>
    );
};

export default DashboardV2;