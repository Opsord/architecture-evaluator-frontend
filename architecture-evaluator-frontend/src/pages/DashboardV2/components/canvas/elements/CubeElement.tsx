// architecture-evaluator-frontend/src/pages/DashboardV2/components/canvas/elements/CubeElement.tsx

import React, { useState, useMemo, useRef } from "react";
import { Html } from "@react-three/drei";
import { BoxGeometry, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import type { ProcessedClassInstance } from "../../../../../types/ProcessedClassInstance.ts";

/* ==========================================================================
 * 1. VISUAL CONSTANTS
 * ======================================================================== */
const COLOR_DEPENDENCY = "#0cdc3d";
const COLOR_DEPENDENT = "#ffda47";
const COLOR_SELECTED = "#38EED0";
const COLOR_DIMMED = "#051c1f";
const OPACITY_DIMMED = 0.25;
const DEFORMATION_FACTOR = 0.4; // Controls deformation intensity (LCOM2)
const VIBRATION_FACTOR = 0.1;   // Controls vibration amplitude (instability)

/* ==========================================================================
 * 2. UTILITY FUNCTIONS
 * ======================================================================== */

/**
 * Generates a deformed box geometry based on LCOM2 (cohesion) metric.
 * @param size - Box size [width, height, depth]
 * @param lcom - LCOM2 value (higher = more deformation)
 * @param minLcom
 * @param maxLcom
 */
function getDeformedBoxGeometry(
    size: [number, number, number],
    lcom: number,
    minLcom: number = 0,
    maxLcom: number = 1
): BoxGeometry {
    // Normalize lcom to [0, 1]
    const normalizedLcom = Math.min(1, Math.max(0, (lcom - minLcom) / (maxLcom - minLcom)));
    const geometry = new BoxGeometry(...size, 2, 2, 2);
    const spikeStrength = normalizedLcom * DEFORMATION_FACTOR;
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        const z = position.getZ(i);
        const spike = 1 + Math.random() * spikeStrength;
        position.setXYZ(i, x * spike, y * spike, z * spike);
    }
    position.needsUpdate = true;
    return geometry;
}

/**
 * Maps Cyclomatic Complexity (CC) to a color gradient (green → yellow → orange → red).
 * @param cc - Cyclomatic Complexity value
 */
function getCCColor(cc: number): string {
    if (cc <= 10) {
        // High testability: Green
        return "rgb(12, 220, 61)";
    } else if (cc <= 20) {
        // Medium testability: Yellow
        return "rgb(255, 218, 71)";
    } else if (cc <= 40) {
        // Low testability: Orange
        return "rgb(253,210,67)";
    } else {
        // Very high cost: Red
        return "rgb(204,11,11)";
    }
}

/* ==========================================================================
 * 3. TYPES
 * ======================================================================== */
interface CubeProps {
    position: [number, number, number];
    label: string;
    size?: [number, number, number];
    unit?: ProcessedClassInstance;
    onPointerOver?: () => void;
    onPointerOut?: () => void;
    onClick?: () => void;
    isSelected?: boolean;
    isConnected?: boolean;
    dimmed?: boolean;
    vibrationEnabled?: boolean;
    isDependency?: boolean;
    isDependent?: boolean;
}

/* ==========================================================================
 * 4. MAIN COMPONENT: CubeElement
 * ======================================================================== */
/**
 * Renders a 3D cube representing a class, with:
 * - Color by Cyclomatic Complexity (CC)
 * - Deformation by LCOM2 (cohesion)
 * - Vibration by instability
 * - Visual state for selection, dependency, and dimming
 * - Tooltip on hover/selection
 */
const CubeElement: React.FC<CubeProps> = ({
                                              position,
                                              label,
                                              size = [1, 1, 1],
                                              unit,
                                              onPointerOver,
                                              onPointerOut,
                                              onClick,
                                              isSelected,
                                              isDependency,
                                              isDependent,
                                              dimmed,
                                              vibrationEnabled = true,
                                          }) => {
    // --- State ---
    const [hovered, setHovered] = useState(false);

    // --- Metrics ---
    const lcom = unit?.classAnalysisInstance?.cohesionMetrics?.lackOfCohesion5 ?? 0;
    const cc = unit?.classAnalysisInstance?.complexityMetrics?.maxMethodMcCabeCC ?? 1;
    const instability = unit?.classAnalysisInstance?.couplingMetrics?.instability ?? 0;

    // --- Geometry & Animation ---
    const meshRef = useRef<Mesh>(null);
    useFrame(() => {
        if (meshRef.current) {
            const safeInstability = Math.min(instability, 0.99);
            if (vibrationEnabled && safeInstability > 0.1) {
                const amplitude = VIBRATION_FACTOR * Math.pow(safeInstability, 2);
                meshRef.current.position.x = position[0] + (Math.random() - 0.5) * amplitude;
                meshRef.current.position.y = position[1] + (Math.random() - 0.5) * amplitude;
                meshRef.current.position.z = position[2] + (Math.random() - 0.5) * amplitude;
            } else {
                meshRef.current.position.set(position[0], position[1], position[2]);
            }
        }
    });
    const geometry = useMemo(() => getDeformedBoxGeometry(size, lcom), [size]);

    // --- Color & Opacity ---
    let color = getCCColor(cc);
    if (isSelected) color = COLOR_SELECTED;
    else if (isDependency) color = COLOR_DEPENDENCY;
    else if (isDependent) color = COLOR_DEPENDENT;
    else if (dimmed) color = COLOR_DIMMED;
    const opacity = dimmed ? OPACITY_DIMMED : 1;

    // --- Render ---
    return (
        <mesh
            ref={meshRef}
            position={position}
            geometry={geometry}
            onPointerOver={() => {
                setHovered(true);
                onPointerOver?.();
            }}
            onPointerOut={() => {
                setHovered(false);
                onPointerOut?.();
            }}
            onClick={onClick}
        >
            <meshStandardMaterial color={color} transparent={true} opacity={opacity} />
            {(hovered || isSelected) && (
                <Html position={[0, 1.2, 0]}>
                    <div style={{
                        background: "white",
                        color: "#17474a",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}>
                        {label}
                    </div>
                </Html>
            )}
        </mesh>
    );
};

export default CubeElement;