import React from "react";
import { Line, Html } from "@react-three/drei";
import { Vector3 } from "three";

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
    const dir = toVec.clone().sub(fromVec).normalize().multiplyScalar(0.5);
    const start = fromVec.clone().add(dir);
    const end = toVec.clone().add(dir.clone().negate());
    const mid = start.clone().lerp(end, 0.5);

    return (
        <group key={lineKey}>
            <Line
                points={[start.toArray(), end.toArray()]}
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
                onPointerOver={() => setHoveredLine(lineKey)}
                onPointerOut={() => setHoveredLine(null)}
            />
            {hoveredLine === lineKey && (
                <Html position={mid.toArray()} center>
                    <div style={{
                        background: "white",
                        color: "#17474a",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                    }}>
                        {source} → {target}
                    </div>
                </Html>
            )}
        </group>
    );
};

export default DependencyLine;