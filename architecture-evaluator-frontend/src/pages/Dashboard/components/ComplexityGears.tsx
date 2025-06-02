export const ComplexityGears = ({ complexity }: { complexity: number }) => {
  const gearCount = Math.min(Math.max(Math.round(complexity / 5), 1), 6); // 1-6 gears
  return (
    <div className="flex gap-1 mb-2">
      {[...Array(gearCount)].map((_, i) => (
        <div
          key={i}
          className="w-4 h-4 bg-gray-400 rounded-full animate-spin-slow"
        ></div>
      ))}
    </div>
  );
};