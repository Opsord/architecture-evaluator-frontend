// architecture-evaluator-frontend/src/pages/DashboardV2/components/Cube.tsx

import React, { useState } from "react";
import { Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { BoxGeometry, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import type { ProcessedClassInstance } from "../../../types/ProcessedClassInstance.ts";


/* --------------------------------------------------------------------------
 * Key Visual Constants
 * ------------------------------------------------------------------------ */

const COLOR_SELECTED = "#38EED0";
const COLOR_CONNECTED = "#048A74";
const COLOR_DIMMED = "#051c1f";
const OPACITY_DIMMED = 0.25;
const DEFORMATION_FACTOR = 0.4; // Factor to control deformation intensity
const VIBRATION_FACTOR = 0.1; // Factor to control vibration amplitude

/* --------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------ */

/**
 * Generates a deformed box geometry based on size and LCOM2 value.
 * @param size - Size of the box in [width, height, depth]
 * @param lcom - Lack of Cohesion 2 (LCOM2) value to determine deformation
 * @return {BoxGeometry} Deformed box geometry
 * @description
 * This function creates a box geometry and applies a random deformation
 * based on the LCOM2 value. The deformation is applied by scaling
 * the vertices of the box randomly within a range determined by the LCOM2 value.
 */
function getDeformedBoxGeometry(size: [number, number, number], lcom: number): BoxGeometry {
    const geometry = new BoxGeometry(...size, 2, 2, 2);
    const spikeStrength = lcom * DEFORMATION_FACTOR;
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
 * Calculates the color for a given CC (Cyclomatic Complexity) value.
 * @param cc - Cyclomatic Complexity value
 * @param minCC - Minimum CC value for color scaling (default: 1)
 * @param maxCC - Maximum CC value for color scaling (default: 20)
 * @return {string} RGB color string in the format "rgb(r,g,b)"
 * @description
 * This function maps the CC value to a color gradient from green (low complexity)
 * to red (high complexity). The color is calculated based on the normalized CC value
 * within the specified range. The blue channel is kept constant to create a
 * yellowish-green-red gradient.
 */
function getCCColor(cc: number, minCC = 1, maxCC = 20): string {
    // Clamp and normalize CC
    const t = Math.min(1, Math.max(0, (cc - minCC) / (maxCC - minCC)));
    // Interpolate: green (low) to red (high)
    const r = Math.round(51 + t * (255 - 51));   // 51 (green) to 255 (red)
    const g = Math.round(255 - t * (255 - 51));  // 255 (green) to 51 (red)
    const b = 80; // Keep blue constant for a yellowish-green-red gradient
    return `rgb(${r},${g},${b})`;
}

/* --------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------ */
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
}

/* --------------------------------------------------------------------------
 * Cube Component
 * ------------------------------------------------------------------------ */
const CompUnitRepresentation: React.FC<CubeProps> = ({
                                                         position,
                                                         label,
                                                         size = [1, 1, 1],
                                                         unit,
                                                         onPointerOver,
                                                         onPointerOut,
                                                         onClick,
                                                         isSelected,
                                                         isConnected,
                                                         dimmed,
                                                         vibrationEnabled = true,
                                                     }) => {
    const [hovered, setHovered] = useState(false);

    // Get LCOM2 value (default 0)
    const lcom = unit?.classAnalysis?.cohesionMetrics?.lackOfCohesion2 ?? 0;

    const meshRef = useRef<Mesh>(null);
    const instability = unit?.classAnalysis?.couplingMetrics?.instability ?? 0;
    useFrame(() => {
        if (meshRef.current) {
            // Clamp instability to avoid excessive vibration
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

    const cc = unit?.classAnalysis?.complexityMetrics?.approxMcCabeCC ?? 1;
    let color = getCCColor(cc);
    if (isSelected) color = COLOR_SELECTED;
    else if (isConnected) color = COLOR_CONNECTED;
    else if (dimmed) color = COLOR_DIMMED;

    const opacity = dimmed ? OPACITY_DIMMED : 1;

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

export default CompUnitRepresentation;