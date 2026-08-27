import React, { useCallback, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import LayerBox from "./elements/LayerBox.tsx";
import CompUnitRow from "./agrupators/CompUnitRow.tsx";
import type { FlaggedCube } from "./agrupators/CompUnitRow.tsx";
import DependencyLinesLayer from "./agrupators/DependencyLinesLayer.tsx";
import CameraControls from "./controls/CameraControls.tsx";
import LayerLabelsOverlay from "./LayerLabelsOverlay.tsx";
import type { ProjectAnalysisDTO } from "../../../../types/ProjectAnalysisInstance.ts";
import type { ProcessedClassInstance } from "../../../../types/ProcessedClassInstance.ts";

const GAP = 2;
const MIN_SIZE = 1;
const MAX_SIZE = 3;
const minLOC = 1;
const maxLOC = 500;
const minBoxWidth = 10;
const boxDepth = 2;
const boxMargin = 1;
const boxVerticalMargin = 1;
const verticalGap = 2;

const categories = [
    { key: "controllers", label: "Controllers" },
    { key: "services", label: "Services" },
    { key: "repositories", label: "Repositories" },
    { key: "entities_documents", label: "Entities & Documents" },
    { key: "testClasses", label: "Test Classes" },
    { key: "otherClasses", label: "Other Classes" },
] as const;

type CategoryKey = (typeof categories)[number]["key"];

function getCubeSize(unit: ProcessedClassInstance): [number, number, number] {
    const loc = unit.classInstance?.linesOfCode ?? 1;
    const size = MIN_SIZE + ((Math.min(loc, maxLOC) - minLOC) / (maxLOC - minLOC)) * (MAX_SIZE - MIN_SIZE);
    return [size, size, size];
}

function getDisplayName(unit: ProcessedClassInstance, categoryKey: CategoryKey, index: number): string {
    const className = unit.classInstance?.name?.trim() ?? "";
    if (
        !className &&
        categoryKey === "repositories" &&
        (unit.classInstance?.implementedInterfaces?.length ?? 0) > 0
    ) {
        return unit.classInstance.implementedInterfaces[0];
    }
    if (className) {
        return className;
    }
    return `Unnamed-${categoryKey}-${index}`;
}

function unitsForCategory(projectData: ProjectAnalysisDTO, key: CategoryKey): ProcessedClassInstance[] {
    if (key === "entities_documents") {
        return [...(projectData.entities || []), ...(projectData.documents || [])];
    }
    return projectData[key] || [];
}

interface CompUnitsSceneProps {
    projectData: ProjectAnalysisDTO;
    selectedCube: string | null;
    setSelectedCube: (name: string | null, unit: ProcessedClassInstance | null) => void;
    vibrationEnabled: boolean;
}

export interface CompUnitVisual {
    data: ProcessedClassInstance;
    displayName: string;
    position: [number, number, number];
    size: [number, number, number];
    rowIdx: number;
}

const CompUnitsScene: React.FC<CompUnitsSceneProps> = ({
    projectData,
    selectedCube,
    setSelectedCube,
    vibrationEnabled,
}) => {
    const { cubes, classPosMap, boxes, rows } = useMemo(() => {
        const cubes: CompUnitVisual[] = [];
        const classPosMap: Record<string, [number, number, number]> = {};
        const boxes: { rowIdx: number; boxPos: [number, number, number]; boxSize: [number, number, number]; label: string }[] = [];
        const rows: CompUnitVisual[][] = [];

        let y = 0;
        let visibleRow = 0;
        categories.forEach((cat) => {
            const units = unitsForCategory(projectData, cat.key);
            if (units.length === 0) return;

            const sortedUnits = [...units].sort(
                (a, b) => (b.classInstance?.linesOfCode ?? 0) - (a.classInstance?.linesOfCode ?? 0),
            );
            const centeredUnits: ProcessedClassInstance[] = new Array(sortedUnits.length);
            let leftIdx = Math.floor(sortedUnits.length / 2) - 1;
            let rightIdx = Math.floor(sortedUnits.length / 2) + 1;
            centeredUnits[Math.floor(sortedUnits.length / 2)] = sortedUnits[0];
            for (let i = 1; i < sortedUnits.length; i++) {
                if (i % 2 === 1) centeredUnits[rightIdx++] = sortedUnits[i];
                else centeredUnits[leftIdx--] = sortedUnits[i];
            }

            const sizes = centeredUnits.map(getCubeSize);
            const totalCubesWidth = sizes.reduce((sum, s) => sum + s[0], 0);
            const totalGapsWidth = (centeredUnits.length - 1) * GAP;
            const boxWidth = Math.max(totalCubesWidth + totalGapsWidth, minBoxWidth);
            const boxHeight = Math.max(...sizes.map((s) => s[1]), MIN_SIZE) + boxVerticalMargin;

            const z = 0;
            const boxPos: [number, number, number] = [0, -y, 0];

            boxes.push({
                rowIdx: visibleRow,
                boxPos,
                boxSize: [boxWidth + boxMargin, boxHeight, boxDepth + boxMargin],
                label: cat.label,
            });

            let x = -((totalCubesWidth + totalGapsWidth) / 2);
            const rowCubes: CompUnitVisual[] = [];
            centeredUnits.forEach((unit, idx) => {
                const size = sizes[idx];
                const displayName = getDisplayName(unit, cat.key, idx);
                const cubeInfo: CompUnitVisual = {
                    data: unit,
                    displayName,
                    position: [x + size[0] / 2, -y, z],
                    size,
                    rowIdx: visibleRow,
                };
                cubes.push(cubeInfo);
                rowCubes.push(cubeInfo);
                classPosMap[displayName] = cubeInfo.position;
                x += size[0] + GAP;
            });
            rows.push(rowCubes);

            y += boxHeight + verticalGap;
            visibleRow++;
        });
        return { cubes, classPosMap, boxes, rows };
    }, [projectData]);

    const cubesByRow = useMemo(() => {
        const selected = cubes.find((c) => c.displayName === selectedCube);
        const dependencySet = new Set(selected?.data.classInstance.classDependencies ?? []);
        const dependentSet = new Set<string>();
        if (selectedCube) {
            for (const cube of cubes) {
                if ((cube.data.classInstance.classDependencies ?? []).includes(selectedCube)) {
                    dependentSet.add(cube.displayName);
                }
            }
        }

        const flagged: FlaggedCube[] = cubes.map((cube) => {
            const isSelected = selectedCube === cube.displayName;
            const isDependency = selectedCube ? dependencySet.has(cube.displayName) : false;
            const isDependent = selectedCube ? dependentSet.has(cube.displayName) : false;
            return {
                ...cube,
                isSelected,
                isDependency,
                isDependent,
                dimmed: !!selectedCube && !isSelected && !isDependency && !isDependent,
            };
        });

        return rows.map((_, idx) => flagged.filter((cube) => cube.rowIdx === idx));
    }, [cubes, rows, selectedCube]);

    const selectedUnit = selectedCube
        ? cubes.find((c) => c.displayName === selectedCube)?.data ?? null
        : null;

    const onSelectCube = useCallback(
        (name: string) => {
            if (name === selectedCube) {
                setSelectedCube(null, null);
                return;
            }
            const unit = cubes.find((c) => c.displayName === name)?.data ?? null;
            setSelectedCube(name, unit);
        },
        [cubes, selectedCube, setSelectedCube],
    );

    const layerLabels = useMemo(() => boxes.map((box) => box.label), [boxes]);

    return (
        <div className="relative w-full h-full min-h-0">
            <Canvas
                className="w-full h-full"
                dpr={[1, 1.5]}
                frameloop={vibrationEnabled ? "always" : "demand"}
                camera={{ position: [0, 0, 20], fov: 60 }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 7]} intensity={1} />

                {boxes.map((box, idx) => {
                    const safeBoxSize = box.boxSize.map((v) => (isNaN(v) ? 1 : v)) as [number, number, number];
                    return (
                        <LayerBox
                            key={`box-${idx}`}
                            position={box.boxPos}
                            size={safeBoxSize}
                        />
                    );
                })}

                {cubesByRow.map((rowCubes, idx) => (
                    <CompUnitRow
                        key={`row-${idx}`}
                        cubes={rowCubes}
                        onSelectCube={onSelectCube}
                        vibrationEnabled={vibrationEnabled}
                    />
                ))}

                <DependencyLinesLayer
                    cubes={cubes}
                    classPosMap={classPosMap}
                    selectedCube={selectedCube}
                    selectedUnit={selectedUnit}
                />

                <CameraControls />
            </Canvas>
            <LayerLabelsOverlay labels={layerLabels} />
        </div>
    );
};

export default CompUnitsScene;
