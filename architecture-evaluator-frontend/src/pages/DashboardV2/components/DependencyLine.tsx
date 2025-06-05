import React, { useState } from "react";
import { Line, Html } from "@react-three/drei";
import { Vector3, CatmullRomCurve3 } from "three";
import { useFrame } from "@react-three/fiber";

const BASE_LINE_WIDTH = 4;      // Default thickness
const CONNECTED_LINE_WIDTH = 6; // When connected
const PULSE_MIN = 6;            // Pulsating min
const PULSE_MAX = 12;           // Pulsating max
const PULSE_STEP = 0.05;        // Pulsating speed

interface DependencyLineProps {
    from: [number, number, number];
    to: [number, number, number];
    source: string;
    target: string;
    hoveredLine: string | null;
    isConnected: boolean;
    setHoveredLine: (key: string | null) => void;
}

const DependencyLine: React.FC<DependencyLineProps> = ({
                                                           from,
                                                           to,
                                                           source,
                                                           target,
                                                           hoveredLine,
                                                           isConnected,
                                                           setHoveredLine,
                                                       }) => {
    const lineKey = `${source}->${target}`;
    const fromVec = new Vector3(...from);
    const toVec = new Vector3(...to);

    const distance = fromVec.distanceTo(toVec);
    const sag = Math.max(0.5, distance * 0.15);

    const control1 = fromVec.clone().lerp(toVec, 0.33).add(new Vector3(0, -sag, 1));
    const control2 = fromVec.clone().lerp(toVec, 0.66).add(new Vector3(0, -sag, 1));

    const curve = new CatmullRomCurve3([fromVec, control1, control2, toVec]);
    const curvePoints = curve.getPoints(32);

    const [lineWidth, setLineWidth] = useState(PULSE_MIN);
    const isHovered = hoveredLine === lineKey;

    {/* Pulsating effect for hovered line */}
    {/* For a slower pulse: use a smaller increment (e.g., prev + 0.03) */}
    {/* For a faster pulse: use a larger increment (e.g., prev + 0.2) */}
    {/* For a bigger/smaller pulse: change the 2 and 5 values */}
    useFrame(() => {
        if (isHovered) {
            setLineWidth((prev) => (prev >= PULSE_MAX ? PULSE_MIN : prev + PULSE_STEP));
        }
    });

    return (
        <group key={lineKey}>
            <Line
                points={curvePoints.map((v) => v.toArray())}
                color={isHovered ? "#20a8ac" : isConnected ? "#39c6c8" : "#17474a"}
                lineWidth={isHovered ? lineWidth : isConnected ? CONNECTED_LINE_WIDTH : BASE_LINE_WIDTH}
                transparent={true}
                opacity={isHovered || isConnected ? 1 : 0.15}
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