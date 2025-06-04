import { Gear } from './gear';
import { defaultGearConfig } from './config';
import type { GearConfig } from './config';

// Main component
export const ComplexityGears = ({
                                    complexity,
                                    config = {}
                                }: {
    complexity: number;
    config?: Partial<GearConfig>;
}) => {
    // Merge provided config with defaults
    const mergedConfig = { ...defaultGearConfig, ...config };

    // Calculate the number of gears based on complexity
    const gearCount = Math.min(
        Math.max(
            Math.round(complexity / mergedConfig.complexityDivisor),
            mergedConfig.minGears
        ),
        mergedConfig.maxGears
    );

    // Calculate gear spacing based on complexity
    const getGearSpacing = (index: number) => {
        // Base spacing that gets smaller as complexity increases
        const baseSpacing = Math.max(
            mergedConfig.maxSpacing - Math.floor(complexity / mergedConfig.spacingDivisor),
            mergedConfig.minSpacing
        );
        // Add some variation between adjacent gears
        return baseSpacing - (index % 2);
    };

    return (
        <div
            className="flex mb-2"
    style={{
        gap: `${Math.max(mergedConfig.minSpacing, mergedConfig.maxSpacing - Math.floor(complexity / mergedConfig.spacingDivisor))}px`
    }}
>
    {[...Array(gearCount)].map((_, i) => {
        // Alternate gear sizes and teeth count
        const size = mergedConfig.minSize + (i % 2) * mergedConfig.sizeVariation;
        const teeth = mergedConfig.minTeeth + (i % mergedConfig.teethVariation);

        // Dynamic spacing style for precise control
        const style = i > 0 ? { marginLeft: `${getGearSpacing(i)}px` } : {};

        return (
            <div key={i} className="relative" style={style}>
        <Gear
            size={size}
        teeth={teeth}
        animationClass={`animate-spin-${i % 2 ? 'slow' : 'slower'}`}
        fillColor={mergedConfig.colors.fill}
        strokeColor={mergedConfig.colors.stroke}
        innerCircleColor={mergedConfig.colors.innerCircle}
        />
        </div>
    );
    })}
    </div>
);
};

// Export types for users of the component
export type { GearConfig };