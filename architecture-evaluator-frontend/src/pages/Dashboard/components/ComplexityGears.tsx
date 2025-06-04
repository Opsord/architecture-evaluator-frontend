export const ComplexityGears = ({ complexity }: { complexity: number }) => {
  const gearCount = Math.min(Math.max(Math.round(complexity / 5), 1), 6); // 1-6 gears

  // Calculate gear spacing based on complexity
  // Higher complexity = tighter coupling between gears
  const getGearSpacing = (index: number) => {
    // Base spacing that gets smaller as complexity increases
    const baseSpacing = Math.max(6 - Math.floor(complexity / 10), 2); // 2-6px
    // Add some variation between adjacent gears
    return baseSpacing - (index % 2);
  };

  // Generate SVG gear path for different sizes
  const createGearPath = (size: number, teeth: number) => {
    const radius = size / 2;
    const innerRadius = radius * 0.7;
    const toothSize = radius * 0.3;
    const angleStep = (Math.PI * 2) / teeth;

    let path = '';
    for (let i = 0; i < teeth; i++) {
      const angle = i * angleStep;
      const nextAngle = (i + 0.5) * angleStep;
      const finalAngle = (i + 1) * angleStep;

      // Inner point
      const ix = innerRadius * Math.cos(angle);
      const iy = innerRadius * Math.sin(angle);

      // Outer point
      const ox = (radius + toothSize) * Math.cos(nextAngle);
      const oy = (radius + toothSize) * Math.sin(nextAngle);

      // Next inner point
      const ix2 = innerRadius * Math.cos(finalAngle);
      const iy2 = innerRadius * Math.sin(finalAngle);

      if (i === 0) {
        path += `M ${ix + radius} ${iy + radius} `;
      }

      path += `L ${ox + radius} ${oy + radius} L ${ix2 + radius} ${iy2 + radius} `;
    }
    path += 'Z';
    return path;
  };

  return (
      <div className="flex mb-2" style={{ gap: `${Math.max(2, 8 - Math.floor(complexity / 8))}px` }}>
        {[...Array(gearCount)].map((_, i) => {
          // Alternate gear sizes and teeth count
          const size = 16 + (i % 2) * 4; // 16px or 20px
          const teeth = 8 + (i % 3); // 8, 9, or 10 teeth

          // Use inline style with dynamic spacing if needed for precise control
          const style = i > 0 ? { marginLeft: `${getGearSpacing(i)}px` } : {};

          return (
              <div key={i} className="relative" style={style}>
                <svg
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    className={`animate-spin-${i % 2 ? 'slow' : 'slower'}`}
                >
                  <path
                      d={createGearPath(size, teeth)}
                      fill="#6b7280"
                      stroke="#4b5563"
                      strokeWidth="1"
                  />
                  <circle
                      cx={size/2}
                      cy={size/2}
                      r={size/6}
                      fill="#4b5563"
                  />
                </svg>
              </div>
          );
        })}
      </div>
  );
};