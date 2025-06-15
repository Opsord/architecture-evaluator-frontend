import React from "react";

type DashboardLegendProps = {
    onClose?: () => void;
};

const lineLegend = [
    {
        label: "Outgoing (Selected class depends on another)",
        color: "#6ecb63",
    },
    {
        label: "Incoming (Another class depends on selected)",
        color: "#ffb347",
    }
];

const DashboardLegend: React.FC<DashboardLegendProps> = ({ onClose }) => (
    <div
        className="relative flex flex-col items-center justify-center gap-2 p-3 w-full h-full bg-gradient-to-br from-bright-turquoise-50 to-white rounded-2xl shadow-inner border border-gray-200"
        style={{ fontSize: "0.85rem" }}
    >
        {onClose && (
            <button
                onClick={onClose}
                className="absolute top-1 right-2 text-gray-400 hover:text-gray-700 text-lg font-bold focus:outline-none"
                aria-label="Close legend"
                type="button"
            >
                ×
            </button>
        )}
        <div className="w-full flex flex-col items-center">
            <div className="font-bold text-base text-primary mb-1 tracking-wide">Legend</div>
            {/* Cyclomatic Complexity */}
            <div className="mb-2 w-full flex flex-col items-center">
                <div className="font-semibold text-gray-800 mb-0.5">Cyclomatic Complexity (CC) Color</div>
                <div className="flex flex-col items-center w-full">
                    <div
                        style={{
                            width: 140,
                            height: 12,
                            borderRadius: 6,
                            border: "1px solid #a0efeb",
                            background: "linear-gradient(90deg, rgb(51,255,51) 0%, rgb(255,255,51) 40%, rgb(255,165,51) 70%, rgb(255,51,51) 100%)",
                            boxShadow: "0 1px 4px 0 rgba(32,168,172,0.08)"
                        }}
                        className="mb-0.5"
                    />
                    <div className="flex justify-between w-full mt-0.5 text-[10px] text-gray-600 font-medium" style={{ width: 140 }}>
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                        <span>Very High</span>
                    </div>
                </div>
            </div>
            {/* Cohesion */}
            <div className="mb-1 w-full text-center">
                <div className="font-semibold text-gray-800">Cohesion (LCOM2)</div>
                <div className="text-[10px] text-gray-600 italic">
                    More deformation = lower cohesion (higher LCOM2)
                </div>
            </div>
            {/* Instability */}
            <div className="mb-1 w-full text-center">
                <div className="font-semibold text-gray-800">Instability</div>
                <div className="text-[10px] text-gray-600 italic">
                    More vibration = higher instability
                </div>
            </div>
            {/* Selection */}
            <div className="w-full text-center mb-2">
                <div className="font-semibold text-gray-800 mb-0.5">Selection</div>
                <div className="flex items-center justify-center gap-2 mt-0.5">
                    <div style={{
                        width: 18,
                        height: 10,
                        background: "#38EED0",
                        borderRadius: 3,
                        border: "1px solid #a0efeb"
                    }} />
                    <span className="text-[10px] text-gray-600 font-medium">Selected</span>
                    <div style={{
                        width: 18,
                        height: 10,
                        background: "#048A74",
                        borderRadius: 3,
                        border: "1px solid #a0efeb"
                    }} />
                    <span className="text-[10px] text-gray-600 font-medium">Connected</span>
                    <div style={{
                        width: 18,
                        height: 10,
                        background: "#051c1f",
                        borderRadius: 3,
                        border: "1px solid #a0efeb"
                    }} />
                    <span className="text-[10px] text-gray-600 font-medium">Dimmed</span>
                </div>
            </div>
            {/* Dependency Lines */}
            <div className="w-full text-center mb-2 ">
                <div className="font-semibold text-gray-800 mb-0.5">Dependency Lines</div>
                <div className="flex flex-col gap-1 items-center-safe">
                    {lineLegend.map(({ label, color, style }, idx) => (
                        <div key={label} className="flex items-center gap-1">
                            <div
                                style={{
                                    width: 24,
                                    height: 0,
                                    borderTop: `3px solid ${color}`,
                                    borderRadius: 1,
                                    ...style,
                                }}
                            />
                            <span className="text-[10px] text-gray-700">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default DashboardLegend;