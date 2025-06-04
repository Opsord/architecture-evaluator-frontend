import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ProjectProvider } from './context/ProjectContext.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <ProjectProvider>
            <App />
        </ProjectProvider>
    </React.StrictMode>
);