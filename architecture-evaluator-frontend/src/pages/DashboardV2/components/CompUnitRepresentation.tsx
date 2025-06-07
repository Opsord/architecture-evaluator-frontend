// architecture-evaluator-frontend/src/pages/DashboardV2/components/Cube.tsx

import React, { useState } from "react";
import { Html } from "@react-three/drei";
import { useMemo } from "react";
import { BoxGeometry } from "three";

/* --------------------------------------------------------------------------
 * Key Visual Constants
 * ------------------------------------------------------------------------ */
const COLOR_DEFAULT = "#F3FEFC";
const COLOR_SELECTED = "#38EED0";
const COLOR_CONNECTED = "#048A74";
const COLOR_DIMMED = "#051c1f";
const OPACITY_DIMMED = 0.25;
const DEFORMATION_FACTOR = 0.4; // Factor to control deformation intensity

/* --------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------ */
function getDeformedBoxGeometry(size: [number, number, number], lcom: number) {
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

/* --------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------ */
interface CubeProps {
    position: [number, number, number];
    label: string;
    size?: [number, number, number];
    unit?: any;
    onPointerOver?: () => void;
    onPointerOut?: () => void;
    onClick?: () => void;
    isSelected?: boolean;
    isConnected?: boolean;
    dimmed?: boolean;
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
                                   }) => {
    const [hovered, setHovered] = useState(false);

    // Get LCOM2 value (default 0)
    const lcom = unit?.analysis?.cohesionMetrics?.lackOfCohesion2 ?? 0;

    // Memoize geometry for performance
    const geometry = useMemo(() => getDeformedBoxGeometry(size, lcom), [size]);

    let color = COLOR_DEFAULT;
    if (isSelected) color = COLOR_SELECTED;
    else if (isConnected) color = COLOR_CONNECTED;
    else if (dimmed) color = COLOR_DIMMED;

    const opacity = dimmed ? OPACITY_DIMMED : 1;

    return (
        <mesh
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