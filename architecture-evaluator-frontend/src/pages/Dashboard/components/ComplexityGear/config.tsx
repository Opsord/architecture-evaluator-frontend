// GearConfig holds the configuration for the gears visualization
export interface GearConfig {
    minGears: number;
    maxGears: number;
    complexityDivisor: number;
    minSpacing: number;
    maxSpacing: number;
    spacingDivisor: number;
    minSize: number;
    sizeVariation: number;
    minTeeth: number;
    teethVariation: number;
    colors: {
        fill: string;
        stroke: string;
        innerCircle: string;
    };
}

// Default configuration
export const defaultGearConfig: GearConfig = {
    minGears: 1,
    maxGears: 6,
    complexityDivisor: 5, // Complexity / this = number of gears
    minSpacing: 2,
    maxSpacing: 6,
    spacingDivisor: 10, // Complexity / this = spacing reduction
    minSize: 16,
    sizeVariation: 4,
    minTeeth: 8,
    teethVariation: 3,
    colors: {
        fill: "#6b7280",
        stroke: "#4b5563",
        innerCircle: "#4b5563"
    }
};