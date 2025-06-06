// AnalysisTooltip.tsx

import React from "react";
import { Html } from "@react-three/drei";
import type { AnalysedCompUnitDTO } from "../../../types/compilation-unit.analysis";

interface Props {
    position: [number, number, number];
    analysis: AnalysedCompUnitDTO;
}

const AnalysisTooltip: React.FC<Props> = ({ position, analysis }) => (
    <Html position={[position[0], position[1] + 2, position[2]]} center>
        <div style={{
            background: "white",
            color: "#17474a",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "0.9rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            minWidth: 220,
            maxWidth: 320
        }}>
            <div><b>Class count:</b> {analysis.classCount}</div>
            <div><b>Interface count:</b> {analysis.interfaceCount}</div>
            <div><b>Statements:</b> {analysis.statementCount}</div>
            <div><b>LOC:</b> {analysis.programMetrics.linesOfCode}</div>
            <div><b>CC:</b> {analysis.complexityMetrics.approxMcCabeCC}</div>
            <div><b>Improved CC:</b> {analysis.complexityMetrics.improvedCC}</div>
            <div><b>Ca:</b> {analysis.couplingMetrics.afferentCoupling}</div>
            <div><b>Ce:</b> {analysis.couplingMetrics.efferentCoupling}</div>
            <div><b>Instability:</b> {analysis.couplingMetrics.instability}</div>
            {/* Add more fields as needed */}
        </div>
    </Html>
);

export default AnalysisTooltip;