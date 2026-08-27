import React from "react";

interface LayerLabelsOverlayProps {
    labels: string[];
}

const LayerLabelsOverlay: React.FC<LayerLabelsOverlayProps> = ({ labels }) => {
    if (labels.length === 0) {
        return null;
    }

    return (
        <ul className="absolute left-2 top-2 z-10 pointer-events-none flex flex-col gap-1">
            {labels.map((label) => (
                <li
                    key={label}
                    className="bg-white/95 text-swamp-900 text-xs px-2 py-0.5 rounded shadow"
                >
                    {label}
                </li>
            ))}
        </ul>
    );
};

export default LayerLabelsOverlay;
