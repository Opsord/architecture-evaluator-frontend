export const Gear = ({
        size,
        teeth,
        animationClass,
        fillColor = "#6b7280",
        strokeColor = "#4b5563",
        innerCircleColor = "#4b5563"
        }: {
        size: number;
        teeth: number;
        animationClass: string;
        fillColor?: string;
        strokeColor?: string;
        innerCircleColor?: string;
        }) => {
        // Create a gear path
        const createGearPath = () => {
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
<svg
width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={animationClass}
        >
<path
d={createGearPath()}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1"
        />
<circle
cx={size/2}
        cy={size/2}
        r={size/6}
        fill={innerCircleColor}
        />
        </svg>
        );
        };