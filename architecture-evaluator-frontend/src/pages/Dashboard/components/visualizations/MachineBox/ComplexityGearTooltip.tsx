// src/pages/Dashboard/components/visualizations/MachineBox/Tooltip.tsx
import React from "react";

interface TooltipProps {
    visible: boolean;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ visible, children, style, className }) => {
    if (!visible) return null;
    return (
        <div
            className={`absolute z-20 bg-white border border-swamp-200 rounded-lg shadow-lg p-2 text-sm text-swamp-900 ${className || ""}`}
            style={style}
        >
            {children}
        </div>
    );
};

export default Tooltip;