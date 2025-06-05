import React from "react";
import { useProjectContext } from "../../context/ProjectContext";

const DashboardV2: React.FC = () => {
    const { projectData } = useProjectContext();

    if (!projectData) {
        return <div className="z-0">No data available. Please analyze a project first.</div>;
    }
};

export default DashboardV2;