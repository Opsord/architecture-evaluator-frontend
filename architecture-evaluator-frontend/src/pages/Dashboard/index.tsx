// Adaptación del componente Dashboard a partir de datos dinámicos
import { useEffect, useState } from 'react'
import mockResponse from "./../../services/Sample data/response-github.json"
import { MetricBox } from "./components/MetricBox.tsx"
import type { ProjectAnalysisDTO } from "../../types/project-analysis"

export default function Dashboard() {
    const [data, setData] = useState<ProjectAnalysisDTO | null>(null)

    useEffect(() => {
        const stored = localStorage.getItem('dashboardData')
        if (stored) {
            setData(JSON.parse(stored) as ProjectAnalysisDTO)
        } else {
            // Fallback to mock data for development
            setTimeout(() => {
                // This is just for development, in production you'd use actual API calls
                const typedMockData = mockResponse as unknown as ProjectAnalysisDTO
                setData(typedMockData)
                localStorage.setItem('dashboardData', JSON.stringify(typedMockData))
            }, 1000)
        }
    }, [])

    if (!data) return <div className="p-4">Cargando...</div>

    // Group components by their type (entities, services, controllers, etc.)
    const componentGroups = {
        'Entities': data.entities || [],
        'Documents': data.documents || [],
        'Repositories': data.repositories || [],
        'Services': data.services || [],
        'Controllers': data.controllers || [],
        'Tests': data.testClasses || [],
        'Other': data.otherClasses || []
    }

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.entries(componentGroups).map(([groupName, components]) =>
                components.map((component, index) => (
                    <MetricBox
                        key={`${groupName}-${index}`}
                        name={`${groupName}: ${component.compilationUnit.className[0] || 'Unnamed'}`}
                        complexity={component.analysis.complexityMetrics.approxMcCabeCC || 0}
                        cohesion={1 - (component.analysis.cohesionMetrics.lackOfCohesion2 || 1)}
                        afferentCoupling={component.analysis.couplingMetrics.afferentCoupling || 0}
                        efferentCoupling={component.analysis.couplingMetrics.efferentCoupling || 0}
                    />
                ))
            )}
        </div>
    )
}