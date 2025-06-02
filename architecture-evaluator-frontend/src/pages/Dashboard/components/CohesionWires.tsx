export const CohesionWires = ({ cohesion }: { cohesion: number }) => {
    const wireCount = Math.round((1 - cohesion) * 5); // Más cohesión = más conexiones
    return (
        <svg className="w-full h-24" viewBox="0 0 100 100">
            {[...Array(wireCount)].map((_, i) => (
                <line
                    key={i}
                    x1={10 + i * 15}
                    y1={20}
                    x2={90 - i * 10}
                    y2={80}
                    stroke="#60a5fa"
                    strokeWidth="2"
                />
            ))}
        </svg>
    );
};