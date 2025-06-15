// architecture-evaluator-frontend/src/pages/DashboardV2/components/canvas/elements/DependencyLine.tsx

import React, { useState } from "react";
import { Line, Html } from "@react-three/drei";
import { Vector3, CatmullRomCurve3 } from "three";
import { useFrame } from "@react-three/fiber";

/* ==========================================================================
 * 1. VISUAL CONSTANTS
 * ======================================================================== */
const BASE_LINE_WIDTH = 4;
const CONNECTED_LINE_WIDTH = 10;
const PULSE_MIN = 6;
const PULSE_MAX = 12;
const PULSE_STEP = 0.05;

const COLOR_DEFAULT = "#17474a";
const COLOR_CONNECTED = "#39c6c8";
const COLOR_HOVERED = "#20a8ac";
const OPACITY_DEFAULT = 0.15;
const OPACITY_ACTIVE = 1;

const COLOR_INCOMING = "#ffb347"; // orange
const COLOR_OUTGOING = "#6ecb63"; // green

const CURVE_POINTS = 32;
const SAG_FACTOR = 0.15;
const SAG_MIN = 0.8;
const CONTROL1_LERP = 0.33;
const CONTROL2_LERP = 0.66;
const CONTROL_POINT_OFFSET = new Vector3(0, -1, 1);

/* ==========================================================================
 * 2. TYPES
 * ======================================================================== */
interface DependencyLineProps {
    from: [number, number, number];
    to: [number, number, number];
    source: string;
    target: string;
    hoveredLine: string | null;
    isConnected: boolean;
    setHoveredLine: (key: string | null) => void;
    direction?: "incoming" | "outgoing" | "other";
}

/* ==========================================================================
 * 3. MAIN COMPONENT: DependencyLine
 * ======================================================================== */
/**
 * Renders a curved line representing a dependency between two classes.
 * - Pulsates when hovered.
 * - Highlights when connected to the selected class.
 * - Shows a tooltip on hover.
 */
const DependencyLine: React.FC<DependencyLineProps> = ({
                                                           from,
                                                           to,
                                                           source,
                                                           target,
                                                           hoveredLine,
                                                           isConnected,
                                                           setHoveredLine,
                                                           direction = "other",
                                                       }) => {
    // --- Unique key for this dependency ---
    const lineKey = `${source}->${target}`;

    // --- Curve calculation ---
    const fromVec = new Vector3(...from);
    const toVec = new Vector3(...to);
    const distance = fromVec.distanceTo(toVec);
    const sag = Math.max(SAG_MIN, distance * SAG_FACTOR);

    // Control points for the curve
    const control1 = fromVec.clone().lerp(toVec, CONTROL1_LERP).add(CONTROL_POINT_OFFSET.clone().multiplyScalar(sag));
    const control2 = fromVec.clone().lerp(toVec, CONTROL2_LERP).add(CONTROL_POINT_OFFSET.clone().multiplyScalar(sag));
    const curve = new CatmullRomCurve3([fromVec, control1, control2, toVec]);
    const curvePoints = curve.getPoints(CURVE_POINTS);

    // --- State for pulsating line width ---
    const [lineWidth, setLineWidth] = useState(PULSE_MIN);
    const isHovered = hoveredLine === lineKey;

    // --- Animate line width when hovered ---
    useFrame(() => {
        if (isHovered) {
            setLineWidth((prev) => (prev >= PULSE_MAX ? PULSE_MIN : prev + PULSE_STEP));
        }
    });

    // --- Color, opacity, and width logic ---
    const color = isHovered
        ? COLOR_HOVERED
        : direction === "incoming"
            ? COLOR_INCOMING
            : direction === "outgoing"
                ? COLOR_OUTGOING
                : isConnected
                    ? COLOR_CONNECTED
                    : COLOR_DEFAULT;
    const opacity = isHovered || isConnected ? OPACITY_ACTIVE : OPACITY_DEFAULT;
    const width = isHovered
        ? lineWidth
        : isConnected
            ? CONNECTED_LINE_WIDTH
            : BASE_LINE_WIDTH;

    // --- Render ---
    return (
        <group key={lineKey}>
            <Line
                points={curvePoints.map((v) => v.toArray())}
                color={color}
                lineWidth={width}
                transparent={true}
                opacity={opacity}
                onPointerOver={() => setHoveredLine(lineKey)}
                onPointerOut={() => {
                    setHoveredLine(null);
                    setLineWidth(PULSE_MIN);
                }}
            />
            {isHovered && (
                <Html position={control1.toArray()} center>
                    <div style={{
                        background: "white",
                        color: "#17474a",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                    }}>
                        {`Class "${target}" depends on "${source}"`}
                    </div>
                </Html>
            )}
        </group>
    );
};

export default DependencyLine;