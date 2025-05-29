interface Metrics {
    complexity: number
    issues: number
    testCoverage: number
    duplicatedLines: number
}

export default function SummaryCards({ metrics }: { metrics: Metrics }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tarjeta Complejidad */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Complejidad</h3>
                <p className="text-2xl font-bold">{metrics.complexity.toFixed(1)}</p>
                <p className="text-sm text-gray-500">
                    {metrics.complexity > 8 ? 'Alta' : metrics.complexity > 5 ? 'Media' : 'Baja'}
                </p>
            </div>

            {/* Tarjeta Issues */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Issues</h3>
                <p className="text-2xl font-bold">{metrics.issues}</p>
                <p className="text-sm text-gray-500">Problemas encontrados</p>
            </div>

            {/* Tarjeta Cobertura */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Cobertura</h3>
                <p className="text-2xl font-bold">{metrics.testCoverage}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${metrics.testCoverage}%` }}
                    ></div>
                </div>
            </div>

            {/* Tarjeta Duplicados */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Líneas duplicadas</h3>
                <p className="text-2xl font-bold">{metrics.duplicatedLines}%</p>
                <p className="text-sm text-gray-500">del código total</p>
            </div>
        </div>
    )
}