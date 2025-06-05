import React from "react";
import { Line, Html } from "@react-three/drei";
import { Vector3, CatmullRomCurve3 } from "three";

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

    // Calculate sag depth based on distance
    const distance = fromVec.distanceTo(toVec);
    const sag = Math.max(0.5, distance * 0.15);

    // Create two sagging control points
    const control1 = fromVec.clone().lerp(toVec, 0.33).add(new Vector3(0, -sag, 1));
    const control2 = fromVec.clone().lerp(toVec, 0.66).add(new Vector3(0, -sag, 1));

    // Create a CatmullRomCurve3 with sagging control points
    const curve = new CatmullRomCurve3([fromVec, control1, control2, toVec]);
    const curvePoints = curve.getPoints(32);

    return (
        <group key={lineKey}>
            <Line
                points={curvePoints.map((v) => v.toArray())}
                color={
                    hoveredLine === lineKey
                        ? "#20a8ac"
                        : isConnected
                            ? "#39c6c8"
                            : "#17474a"
                }
                lineWidth={
                    hoveredLine === lineKey
                        ? 5
                        : isConnected
                            ? 4
                            : 2
                }
                transparent={true}
                opacity={
                    hoveredLine === lineKey || isConnected
                        ? 1
                        : 0.15
                }
                onPointerOver={() => setHoveredLine(lineKey)}
                onPointerOut={() => setHoveredLine(null)}
            />
            {hoveredLine === lineKey && (
                <Html position={control1.toArray()} center>
                    <div style={{
                        background: "white",
                        color: "#17474a",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                    }}>
                        {`Class "${source}" depends on "${target}"`}
                    </div>
                </Html>
            )}
        </group>
    );
};

export default DependencyLine;