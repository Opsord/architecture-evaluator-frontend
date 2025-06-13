import React from "react";

const colorGradient = [
    { color: "rgb(51,255,51)", label: "Low CC (Green)" },
    { color: "rgb(255,255,51)", label: "Medium CC (Yellow)" },
    { color: "rgb(255,165,51)", label: "High CC (Orange)" },
    { color: "rgb(255,51,51)", label: "Very High CC (Red)" },
];

const DashboardLegend: React.FC = () => (
    <div className="flex flex-col gap-3 p-4 text-[14px] w-full h-full">
        <div>
            <div className="font-semibold mb-1 text-primary">Legend</div>
            <div className="mb-2">
                <div className="font-medium">Cyclomatic Complexity (CC) Color</div>
                <div className="flex items-center gap-2 mt-1">
                    {colorGradient.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <div style={{
                                width: 28,
                                height: 16,
                                background: item.color,
                                borderRadius: 4,
                                border: "1px solid #ccc"
                            }} />
                            <span className="text-xs mt-1 text-gray-600">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-2">
                <div className="font-medium">Cohesion (LCOM2)</div>
                <div className="text-xs text-gray-600">
                    More deformation = lower cohesion (higher LCOM2)
                </div>
            </div>
            <div className="mb-2">
                <div className="font-medium">Instability</div>
                <div className="text-xs text-gray-600">
                    More vibration = higher instability
                </div>
            </div>
            <div>
                <div className="font-medium">Selection</div>
                <div className="flex items-center gap-2 mt-1">
                    <div style={{
                        width: 28,
                        height: 16,
                        background: "#38EED0",
                        borderRadius: 4,
                        border: "1px solid #ccc"
                    }} />
                    <span className="text-xs text-gray-600">Selected</span>
                    <div style={{
                        width: 28,
                        height: 16,
                        background: "#048A74",
                        borderRadius: 4,
                        border: "1px solid #ccc"
                    }} />
                    <span className="text-xs text-gray-600">Connected</span>
                    <div style={{
                        width: 28,
                        height: 16,
                        background: "#051c1f",
                        borderRadius: 4,
                        border: "1px solid #ccc"
                    }} />
                    <span className="text-xs text-gray-600">Dimmed</span>
                </div>
            </div>
        </div>
    </div>
);

export default DashboardLegend;