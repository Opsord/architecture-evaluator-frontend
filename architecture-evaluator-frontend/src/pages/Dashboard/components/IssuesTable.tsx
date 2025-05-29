interface Issue {
    id: number
    type: string
    description: string
    severity: 'Low' | 'Medium' | 'High'
}

export default function IssuesTable({ issues }: { issues: Issue[] }) {
    const severityColor = (severity: string) => {
        switch (severity) {
            case 'High': return 'bg-red-100 text-red-800'
            case 'Medium': return 'bg-yellow-100 text-yellow-800'
            default: return 'bg-green-100 text-green-800'
        }
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow overflow-hidden">
            <h3 className="font-medium mb-4">Problemas detectados</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Severidad</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {issues.map((issue) => (
                        <tr key={issue.id}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                {issue.type}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                {issue.description}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${severityColor(issue.severity)}`}>
                    {issue.severity}
                  </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}