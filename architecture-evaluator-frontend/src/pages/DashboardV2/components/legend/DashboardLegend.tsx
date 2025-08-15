import React from "react";

type DashboardLegendProps = {
    onClose?: () => void;
};

const lineLegend = [
    {
        label: "Outgoing",
        sublabel: "(Selected depends on another)",
        color: "#6ecb63",
    },
    {
        label: "Incoming",
        sublabel: "(Another depends on selected)",
        color: "#ffb347",
    }
];

// @ts-ignore
const DashboardLegend: React.FC<DashboardLegendProps> = ({ onClose }) => (
    <div
        className="relative flex flex-col p-2 w-full h-full bg-gradient-to-br from-bright-turquoise-50 to-white rounded-xl shadow-inner border border-gray-200"
        style={{ fontSize: "0.75rem" }}
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

        {/* Header */}
        <div className="font-bold text-xl text-primary mb-3 text-center tracking-wide">Legend</div>

        {/* Cyclomatic Complexity */}
        <div className="mb-4 bg-white/60 rounded-lg p-3 border border-gray-200">
            <div className="font-bold text-bright-turquoise-600 mb-2 text-base text-center">Color</div>
            <div className="font-semibold text-gray-700 mb-2 text-sm text-center">Cyclomatic Complexity</div>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col items-center">
                    <div className="w-6 h-4 bg-green-400 rounded border border-green-500 mb-1"></div>
                    <span className="text-sm text-gray-700 font-medium">Low</span>
                    <span className="text-xs text-gray-500">(1-10)</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-6 h-4 bg-yellow-400 rounded border border-yellow-500 mb-1"></div>
                    <span className="text-sm text-gray-700 font-medium">Medium</span>
                    <span className="text-xs text-gray-500">(10-20)</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-6 h-4 bg-orange-400 rounded border border-orange-500 mb-1"></div>
                    <span className="text-sm text-gray-700 font-medium">High</span>
                    <span className="text-xs text-gray-500">(20-40)</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-6 h-4 bg-red-500 rounded border border-red-600 mb-1"></div>
                    <span className="text-sm text-gray-700 font-medium">Very High</span>
                    <span className="text-xs text-gray-500">(40+)</span>
                </div>
            </div>
        </div>

        {/* Shape and Vibration combined */}
        <div className="mb-4 bg-white/60 rounded-lg p-3 border border-gray-200">
            <div className="font-bold text-bright-turquoise-600 mb-2 text-base text-center">Shape & Motion</div>

            {/* Shape: Cohesion */}
            <div className="mb-3">
                <div className="font-semibold text-gray-700 mb-1 text-sm text-center">Shape: Cohesion (LCOM5)</div>
                <div className="grid grid-cols-2 gap-2 p-3">
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-3 bg-primary rounded border border-primary-dark mb-1"></div>
                        <span className="text-xs text-gray-700 text-center">High cohesion</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-3 bg-primary rounded border border-primary-dark transform skew-x-12 skew-y-3 mb-1"></div>
                        <span className="text-xs text-gray-700 text-center">Low cohesion</span>
                    </div>
                </div>
            </div>

            {/* Vibration: Instability */}
            <div>
                <div className="font-semibold text-gray-700 mb-1 text-sm text-center">Motion: Instability</div>
                <div className="grid grid-cols-3 gap-1 p-3">
                    <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary rounded-full mb-1"></div>
                        <span className="text-xs text-gray-700 text-center">Stable</span>
                        <span className="text-[10px] text-gray-500">(I=0)</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div
                            className="w-3 h-3 bg-primary rounded-full mb-1"
                            style={{ animation: 'vibrate 0.6s infinite' }}
                        ></div>
                        <span className="text-xs text-gray-700 text-center">Medium</span>
                        <span className="text-[10px] text-gray-500">(0&lt;I&lt;1)</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div
                            className="w-3 h-3 bg-primary rounded-full mb-1"
                            style={{ animation: 'vibrate 0.2s infinite' }}
                        ></div>
                        <span className="text-xs text-gray-700 text-center">Unstable</span>
                        <span className="text-[10px] text-gray-500">(I=1)</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Selection States */}
        <div className="mb-4 bg-white/60 rounded-lg p-3 border border-gray-200">
            <div className="font-bold text-bright-turquoise-600 mb-2 text-base text-center">Selection</div>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col items-center">
                    <div style={{
                        width: 12,
                        height: 8,
                        background: "#38EED0",
                        borderRadius: 2,
                        border: "1px solid #a0efeb",
                        marginBottom: "4px"
                    }} />
                    <span className="text-xs text-gray-700 font-medium text-center">Selected</span>
                </div>
                <div className="flex flex-col items-center">
                    <div style={{
                        width: 12,
                        height: 8,
                        background: "#7d8d91",
                        borderRadius: 2,
                        border: "1px solid #a0efeb",
                        marginBottom: "4px"
                    }} />
                    <span className="text-xs text-gray-700 font-medium text-center">Dimmed</span>
                </div>
                <div className="flex flex-col items-center">
                    <div style={{
                        width: 12,
                        height: 8,
                        background: "#0cdc3d",
                        borderRadius: 2,
                        border: "1px solid #a0efeb",
                        marginBottom: "4px"
                    }} />
                    <span className="text-xs text-gray-700 font-medium text-center">Dependency</span>
                    <span className="text-[10px] text-gray-500 text-center">(Selected depends on this)</span>
                </div>
                <div className="flex flex-col items-center">
                    <div style={{
                        width: 12,
                        height: 8,
                        background: "#ffda47",
                        borderRadius: 2,
                        border: "1px solid #a0efeb",
                        marginBottom: "4px"
                    }} />
                    <span className="text-xs text-gray-700 font-medium text-center">Dependent</span>
                    <span className="text-[10px] text-gray-500 text-center">(This depends on selected)</span>
                </div>
            </div>
        </div>

        {/* Dependency Lines */}
        <div className="bg-white/60 rounded-lg p-3 border border-gray-200">
            <div className="font-bold text-bright-turquoise-600 mb-2 text-base text-center">Dependencies</div>
            <div className="space-y-2">
                {lineLegend.map(({ label, sublabel, color }) => (
                    <div key={label} className="flex flex-col items-center text-center">
                        <div className="flex items-center gap-2 mb-1">
                            <div
                                style={{
                                    width: 20,
                                    height: 0,
                                    borderTop: `2px solid ${color}`,
                                    borderRadius: 1,
                                }}
                            />
                            <span className="text-sm text-gray-700 font-medium">{label}</span>
                        </div>
                        <span className="text-xs text-gray-500 leading-tight">{sublabel}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default DashboardLegend;
