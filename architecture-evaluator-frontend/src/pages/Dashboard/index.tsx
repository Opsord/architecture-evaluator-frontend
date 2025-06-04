import React from "react";
import { useProjectContext } from "../../context/ProjectContext";
import LayerSection from "./components/LayerSection";
import EntitiesDocumentsSection from "./components/EntitiesDocumentsSection";

const Dashboard: React.FC = () => {
    const { projectData } = useProjectContext();

    if (!projectData) {
        return <div>No data available. Please analyze a project first.</div>;
    }

    const { controllers, services, repositories, entities, documents, testClasses, otherClasses } = projectData;

    return (
        <div className="dashboard">
            <LayerSection title="Controllers" units={controllers} />
            <LayerSection title="Services" units={services} />
            <LayerSection title="Repositories" units={repositories} />
            <EntitiesDocumentsSection entities={entities} documents={documents} />
            <LayerSection title="Test Classes" units={testClasses} />
            <LayerSection title="Other Classes" units={otherClasses} />
        </div>
    );
};

export default Dashboard;