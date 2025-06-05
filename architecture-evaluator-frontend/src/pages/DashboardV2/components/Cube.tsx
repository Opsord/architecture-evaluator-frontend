import React, { useState } from "react";
import { Html } from "@react-three/drei";

interface CubeProps {
    position: [number, number, number];
    label: string;
}

const Cube: React.FC<CubeProps> = ({ position, label }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <mesh
            position={position}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? "#20a8ac" : "#68e0de"} />
            {hovered && (
                <Html position={[0, 1.2, 0]}>
                    <div style={{
                        background: "white",
                        color: "#17474a",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                    }}>
                        {label}
                    </div>
                </Html>
            )}
        </mesh>
    );
};

export default Cube;