import React, { useState } from "react";
import { Html } from "@react-three/drei";

const COLOR_DEFAULT = "#F3FEFC";
const COLOR_SELECTED = "#38EED0";
const COLOR_CONNECTED = "#048A74";
const COLOR_DIMMED = "#051c1f";

const OPACITY_DEFAULT = 1;
const OPACITY_DIMMED = 0.25;

interface CubeProps {
    position: [number, number, number];
    label: string;
    onPointerOver?: () => void;
    onPointerOut?: () => void;
    onClick?: () => void;
    isSelected?: boolean;
    isConnected?: boolean;
    dimmed?: boolean;
}

const Cube: React.FC<CubeProps> = ({
                                       position,
                                       label,
                                       onPointerOver,
                                       onPointerOut,
                                       onClick,
                                       isSelected,
                                       isConnected,
                                       dimmed,
                                   }) => {
    const [hovered, setHovered] = useState(false);

    let color = COLOR_DEFAULT;
    if (isSelected) color = COLOR_SELECTED;
    else if (isConnected) color = COLOR_CONNECTED;
    else if (dimmed) color = COLOR_DIMMED;

    const opacity = dimmed ? OPACITY_DIMMED : OPACITY_DEFAULT;

    return (
        <mesh
            position={position}
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
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} transparent={true} opacity={opacity} />            {(hovered || isSelected) && (
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