import React, { useMemo } from "react";
import { Line, Html } from "@react-three/drei";
import { Vector3, CatmullRomCurve3 } from "three";

const BASE_LINE_WIDTH = 4;
const CONNECTED_LINE_WIDTH = 10;
const HOVER_LINE_WIDTH = 10;

const COLOR_DEFAULT = "#17474a";
const COLOR_CONNECTED = "#39c6c8";
const COLOR_HOVERED = "#20a8ac";
const OPACITY_DEFAULT = 0.15;
const OPACITY_ACTIVE = 1;

const COLOR_INCOMING = "#ffb347";
const COLOR_OUTGOING = "#6ecb63";

const CURVE_POINTS = 32;
const SAG_FACTOR = 0.15;
const SAG_MIN = 0.8;
const CONTROL1_LERP = 0.33;
const CONTROL2_LERP = 0.66;
const CONTROL_POINT_OFFSET = new Vector3(0, -1, 1);

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
    const lineKey = `${source}->${target}`;
    const isHovered = hoveredLine === lineKey;

    const { curvePoints, tooltipPosition } = useMemo(() => {
        const fromVec = new Vector3(...from);
        const toVec = new Vector3(...to);
        const distance = fromVec.distanceTo(toVec);
        const sag = Math.max(SAG_MIN, distance * SAG_FACTOR);
        const offset = CONTROL_POINT_OFFSET.clone().multiplyScalar(sag);
        const control1 = fromVec.clone().lerp(toVec, CONTROL1_LERP).add(offset);
        const control2 = fromVec.clone().lerp(toVec, CONTROL2_LERP).add(offset);
        const curve = new CatmullRomCurve3([fromVec, control1, control2, toVec]);
        return {
            curvePoints: curve.getPoints(CURVE_POINTS).map((v) => v.toArray() as [number, number, number]),
            tooltipPosition: control1.toArray() as [number, number, number],
        };
    }, [from, to]);

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
        ? HOVER_LINE_WIDTH
        : isConnected
            ? CONNECTED_LINE_WIDTH
            : BASE_LINE_WIDTH;

    return (
        <group>
            <Line
                points={curvePoints}
                color={color}
                lineWidth={width}
                transparent={true}
                opacity={opacity}
                onPointerOver={() => setHoveredLine(lineKey)}
                onPointerOut={() => setHoveredLine(null)}
            />
            {isHovered && (
                <Html position={tooltipPosition} center>
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
