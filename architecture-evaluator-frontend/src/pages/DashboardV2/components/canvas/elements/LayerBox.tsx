import React from "react";
import { DoubleSide } from "three";

interface LayerBoxProps {
    position: [number, number, number];
    size: [number, number, number];
}

const noopRaycast = () => {};

const LayerBox: React.FC<LayerBoxProps> = ({ position, size }) => (
    <mesh position={position} renderOrder={-1} raycast={noopRaycast}>
        <boxGeometry args={size} />
        <meshStandardMaterial
            color="#cff8f5"
            transparent={true}
            opacity={0.05}
            side={DoubleSide}
            depthWrite={false}
        />
    </mesh>
);

export default React.memo(LayerBox);
