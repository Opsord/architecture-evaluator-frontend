import React from 'react';
import { useProjectContext } from '../../context/ProjectContext';

const Dashboard: React.FC = () => {
    const { projectData } = useProjectContext();

    return (
        <div>
            <h1>Dashboard</h1>
            <pre>
                {projectData ? JSON.stringify(projectData, null, 2) : 'No project loaded.'}
            </pre>
        </div>
    );
};

export default Dashboard;