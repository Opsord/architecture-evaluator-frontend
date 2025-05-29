import SummaryCards from './components/SummaryCards'
import ComplexityChart from './components/ComplexityChart'
import IssuesTable from './components/IssuesTable'

export default function Dashboard() {
    // Estos datos normalmente vendrían de una API
    const mockData = {
        metrics: {
            complexity: 7.8,
            issues: 24,
            testCoverage: 65,
            duplicatedLines: 12
        },
        issues: [
            { id: 1, type: 'Security', description: 'Potential SQL injection', severity: 'High' as 'High' },
            { id: 2, type: 'Code Smell', description: 'Long method (30 lines)', severity: 'Medium' as 'Medium' },
            // More issues...
        ]
    }

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">Resultados del análisis</h1>

            <SummaryCards metrics={mockData.metrics} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ComplexityChart complexity={mockData.metrics.complexity} />
                <IssuesTable issues={mockData.issues} />
            </div>
        </div>
    )
}