import React from "react";
import { useProjectContext } from "../../context/ProjectContext";
import BoxMachine from "./components/BoxMachine";

const LAYERS = [
    { key: "controllers", label: "Controllers" },
    { key: "services", label: "Services" },
    { key: "repositories", label: "Repositories" },
    { key: "entities", label: "Entities" },
    { key: "documents", label: "Documents" },
    { key: "testClasses", label: "Test Classes" },
    { key: "otherClasses", label: "Other Classes" }
];

const Dashboard: React.FC = () => {
    const { projectData } = useProjectContext();

    if (!projectData) {
        return <div>No data available. Please analyze a project first.</div>;
    }

    return (
        <div className="dashboard">
            {LAYERS.map(layer => {
                const units = (projectData as any)[layer.key] as any[];
                if (!units || units.length === 0) return null;
                return (
                    <div key={layer.key} className="layer-section">
                        <h2>{layer.label}</h2>
                        <div className="layer-boxes">
                            {units.map((unit, idx) => (
                                <BoxMachine key={idx} unit={unit} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Dashboard;