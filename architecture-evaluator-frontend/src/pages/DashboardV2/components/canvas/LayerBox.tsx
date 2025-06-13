// architecture-evaluator-frontend/src/pages/DashboardV2/components/LayerBox.tsx
import React from "react";
import { DoubleSide } from "three";
import { Html } from "@react-three/drei";

interface LayerBoxProps {
    position: [number, number, number];
    size: [number, number, number];
    label: string;
}

const LayerBox: React.FC<LayerBoxProps> = ({ position, size, label }) => (
    <group>
        <mesh position={position} renderOrder={-1}>
            <boxGeometry args={size} />
            <meshStandardMaterial
                color="#cff8f5"
                transparent={true}
                opacity={0.05}
                side={DoubleSide}
                depthWrite={false}
            />
        </mesh>
        <Html position={[position[0], position[1] + size[1] / 2 + 0.7, position[2]]} center>
            <div style={{
                background: "white",
                color: "#17474a",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "0.9rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                opacity: 0.95
            }}>
                {label}
            </div>
        </Html>
    </group>
);

export default LayerBox;