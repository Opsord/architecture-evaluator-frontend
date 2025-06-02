export const CouplingCables = ({
                                   afferent,
                                   efferent
                               }: {
    afferent: number;
    efferent: number;
}) => {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(Math.min(afferent, 6))].map((_, i) => (
                <div
                    key={`a-${i}`}
                    className="absolute left-[-20px] top-1/2 w-4 h-0.5 bg-green-500"
                    style={{ top: `${30 + i * 10}px` }}
                />
            ))}
            {[...Array(Math.min(efferent, 6))].map((_, i) => (
                <div
                    key={`e-${i}`}
                    className="absolute right-[-20px] top-1/2 w-4 h-0.5 bg-red-500"
                    style={{ top: `${30 + i * 10}px` }}
                />
            ))}
        </div>
    );
};