import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ComplexityChart({ complexity }: { complexity: number }) {
    const data = {
        labels: ['Complejidad actual', 'Restante'],
        datasets: [
            {
                data: [complexity, 10 - complexity],
                backgroundColor: ['#3B82F6', '#E5E7EB'],
                borderWidth: 0,
            },
        ],
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-4">Nivel de complejidad</h3>
            <div className="h-64">
                <Pie
                    data={data}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'bottom' }
                        }
                    }}
                />
            </div>
        </div>
    )
}