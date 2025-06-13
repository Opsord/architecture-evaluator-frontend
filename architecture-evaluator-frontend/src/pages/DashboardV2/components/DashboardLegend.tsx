import React from "react";

const DashboardLegend: React.FC = () => (
    <div className="flex flex-col items-center justify-center gap-4 p-5 w-full h-full bg-gradient-to-br from-bright-turquoise-50 to-white rounded-2xl shadow-inner border border-gray-200">
        <div className="w-full flex flex-col items-center">
            <div className="font-bold text-lg text-primary mb-2 tracking-wide">Legend</div>
            <div className="mb-4 w-full flex flex-col items-center">
                <div className="font-semibold text-gray-800 mb-1">Cyclomatic Complexity (CC) Color</div>
                <div className="flex flex-col items-center w-full">
                    <div
                        style={{
                            width: 200,
                            height: 18,
                            borderRadius: 8,
                            border: "1.5px solid #a0efeb",
                            background: "linear-gradient(90deg, rgb(51,255,51) 0%, rgb(255,255,51) 40%, rgb(255,165,51) 70%, rgb(255,51,51) 100%)",
                            boxShadow: "0 1px 6px 0 rgba(32,168,172,0.08)"
                        }}
                        className="mb-1"
                    />
                    <div className="flex justify-between w-full mt-1 text-xs text-gray-600 font-medium" style={{ width: 200 }}>
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                        <span>Very High</span>
                    </div>
                </div>
            </div>
            <div className="mb-3 w-full text-center">
                <div className="font-semibold text-gray-800">Cohesion (LCOM2)</div>
                <div className="text-xs text-gray-600 italic">
                    More deformation = lower cohesion (higher LCOM2)
                </div>
            </div>
            <div className="mb-3 w-full text-center">
                <div className="font-semibold text-gray-800">Instability</div>
                <div className="text-xs text-gray-600 italic">
                    More vibration = higher instability
                </div>
            </div>
            <div className="w-full text-center">
                <div className="font-semibold text-gray-800 mb-1">Selection</div>
                <div className="flex items-center justify-center gap-3 mt-1">
                    <div style={{
                        width: 28,
                        height: 16,
                        background: "#38EED0",
                        borderRadius: 4,
                        border: "1.5px solid #a0efeb"
                    }} />
                    <span className="text-xs text-gray-600 font-medium">Selected</span>
                    <div style={{
                        width: 28,
                        height: 16,
                        background: "#048A74",
                        borderRadius: 4,
                        border: "1.5px solid #a0efeb"
                    }} />
                    <span className="text-xs text-gray-600 font-medium">Connected</span>
                    <div style={{
                        width: 28,
                        height: 16,
                        background: "#051c1f",
                        borderRadius: 4,
                        border: "1.5px solid #a0efeb"
                    }} />
                    <span className="text-xs text-gray-600 font-medium">Dimmed</span>
                </div>
            </div>
        </div>
    </div>
);

export default DashboardLegend;