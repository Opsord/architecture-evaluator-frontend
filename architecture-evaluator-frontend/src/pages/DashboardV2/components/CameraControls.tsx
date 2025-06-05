import { OrbitControls } from "@react-three/drei";
import React from "react";

const CameraControls: React.FC = () => (
    <OrbitControls
        enableRotate={true}
        enablePan={true}
        enableZoom={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        screenSpacePanning={true}
    />
);

export default CameraControls;