import React, { useState, useMemo, useRef, useEffect } from "react";
import { Html } from "@react-three/drei";
import { BoxGeometry, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import type { ProcessedClassInstance } from "../../../../../types/ProcessedClassInstance.ts";

const COLOR_DEPENDENCY = "#0cdc3d";
const COLOR_DEPENDENT = "#ffda47";
const COLOR_SELECTED = "#38EED0";
const COLOR_DIMMED = "#051c1f";
const OPACITY_DIMMED = 0.25;
const DEFORMATION_FACTOR = 0.4;
const VIBRATION_FACTOR = 0.1;

const plainGeometryCache = new Map<string, BoxGeometry>();

function hashLabel(label: string): number {
    let hash = 0;
    for (let i = 0; i < label.length; i++) {
        hash = Math.imul(31, hash) + label.charCodeAt(i);
    }
    return hash;
}

function seededUnit(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function sizeKey(size: [number, number, number]): string {
    return `${size[0]},${size[1]},${size[2]}`;
}

function getPlainBoxGeometry(size: [number, number, number]): BoxGeometry {
    const key = sizeKey(size);
    let geometry = plainGeometryCache.get(key);
    if (!geometry) {
        geometry = new BoxGeometry(...size);
        plainGeometryCache.set(key, geometry);
    }
    return geometry;
}

function getDeformedBoxGeometry(
    size: [number, number, number],
    lcom: number,
    seed: number,
    minLcom: number = 0,
    maxLcom: number = 1,
): BoxGeometry {
    const normalizedLcom = Math.min(1, Math.max(0, (lcom - minLcom) / (maxLcom - minLcom)));
    const geometry = new BoxGeometry(...size, 2, 2, 2);
    const spikeStrength = normalizedLcom * DEFORMATION_FACTOR;
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        const z = position.getZ(i);
        const spike = 1 + seededUnit(seed + i) * spikeStrength;
        position.setXYZ(i, x * spike, y * spike, z * spike);
    }
    position.needsUpdate = true;
    return geometry;
}

function getCCColor(cc: number): string {
    if (cc <= 10) {
        return "rgb(12, 220, 61)";
    } else if (cc <= 20) {
        return "rgb(255,218,71)";
    } else if (cc <= 40) {
        return "rgb(243,144,20)";
    }
    return "rgb(204,11,11)";
}

interface CubeProps {
    position: [number, number, number];
    label: string;
    size?: [number, number, number];
    unit?: ProcessedClassInstance;
    onSelect?: (name: string) => void;
    isSelected?: boolean;
    dimmed?: boolean;
    vibrationEnabled?: boolean;
    isDependency?: boolean;
    isDependent?: boolean;
}

const CubeElement: React.FC<CubeProps> = ({
    position,
    label,
    size = [1, 1, 1],
    unit,
    onSelect,
    isSelected,
    isDependency,
    isDependent,
    dimmed,
    vibrationEnabled = true,
}) => {
    const [hovered, setHovered] = useState(false);

    const lcom = unit?.classAnalysisInstance?.cohesionMetrics?.lackOfCohesion5 ?? 0;
    const cc = unit?.classAnalysisInstance?.complexityMetrics?.maxMethodMcCabeCC ?? 1;
    const instability = unit?.classAnalysisInstance?.couplingMetrics?.instability ?? 0;

    const meshRef = useRef<Mesh>(null);
    const shouldVibrate = vibrationEnabled && Math.min(instability, 0.99) > 0.1;
    const phase = useMemo(() => hashLabel(label) * 0.001, [label]);

    useEffect(() => {
        if (!shouldVibrate && meshRef.current) {
            meshRef.current.position.set(position[0], position[1], position[2]);
        }
    }, [shouldVibrate, position]);

    useFrame((state) => {
        if (!meshRef.current || !shouldVibrate) {
            return;
        }
        const amplitude = VIBRATION_FACTOR * Math.pow(Math.min(instability, 0.99), 2);
        const t = state.clock.elapsedTime + phase;
        meshRef.current.position.set(
            position[0] + Math.sin(t * 13) * amplitude,
            position[1] + Math.sin(t * 17) * amplitude,
            position[2] + Math.sin(t * 19) * amplitude,
        );
    });

    const geometry = useMemo(() => {
        if (lcom <= 0) {
            return getPlainBoxGeometry(size);
        }
        return getDeformedBoxGeometry(size, lcom, hashLabel(label));
    }, [size, lcom, label]);

    useEffect(() => {
        if (lcom <= 0) {
            return;
        }
        return () => {
            geometry.dispose();
        };
    }, [geometry, lcom]);

    let color = getCCColor(cc);
    if (isSelected) color = COLOR_SELECTED;
    else if (isDependency) color = COLOR_DEPENDENCY;
    else if (isDependent) color = COLOR_DEPENDENT;
    else if (dimmed) color = COLOR_DIMMED;

    return (
        <mesh
            ref={meshRef}
            position={position}
            geometry={geometry}
            onPointerOver={(event) => {
                event.stopPropagation();
                setHovered(true);
            }}
            onPointerOut={() => setHovered(false)}
            onClick={(event) => {
                event.stopPropagation();
                onSelect?.(label);
            }}
        >
            <meshStandardMaterial
                color={color}
                transparent={!!dimmed}
                opacity={dimmed ? OPACITY_DIMMED : 1}
            />
            {(hovered || isSelected) && (
                <Html position={[0, 1.2, 0]}>
                    <div style={{
                        background: "white",
                        color: "#17474a",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}>
                        {label}
                    </div>
                </Html>
            )}
        </mesh>
    );
};

function cubePropsEqual(prev: CubeProps, next: CubeProps): boolean {
    const prevSize = prev.size ?? [1, 1, 1];
    const nextSize = next.size ?? [1, 1, 1];
    return (
        prev.label === next.label &&
        prev.position[0] === next.position[0] &&
        prev.position[1] === next.position[1] &&
        prev.position[2] === next.position[2] &&
        prevSize[0] === nextSize[0] &&
        prevSize[1] === nextSize[1] &&
        prevSize[2] === nextSize[2] &&
        prev.isSelected === next.isSelected &&
        prev.isDependency === next.isDependency &&
        prev.isDependent === next.isDependent &&
        prev.dimmed === next.dimmed &&
        prev.vibrationEnabled === next.vibrationEnabled &&
        prev.unit === next.unit &&
        prev.onSelect === next.onSelect
    );
}

export default React.memo(CubeElement, cubePropsEqual);
