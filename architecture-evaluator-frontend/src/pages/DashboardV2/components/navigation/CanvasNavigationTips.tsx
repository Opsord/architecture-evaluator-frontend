import React from 'react';
import { FaMousePointer, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import { MdRotateRight } from 'react-icons/md';

const CanvasNavigationTips: React.FC = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex items-center gap-6 text-sm">
                {/* Left Click - Rotate */}
                <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 shadow-sm border border-gray-border/50">
                    <div className="flex items-center gap-1">
                        <FaMousePointer className="text-primary text-lg" />
                        <span className="text-xs text-gray-600">Left</span>
                    </div>
                    <MdRotateRight className="text-bright-turquoise-600 text-lg" />
                    <span className="text-gray-dark font-medium">Rotate</span>
                </div>

                {/* Right Click - Pan/Drag */}
                <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 shadow-sm border border-gray-border/50">
                    <div className="flex items-center gap-1">
                        <FaMousePointer className="text-primary text-lg" />
                        <span className="text-xs text-gray-600">Right</span>
                    </div>
                    <div className="flex text-bright-turquoise-600">
                        <span className="text-lg">⇄</span>
                    </div>
                    <span className="text-gray-dark font-medium">Pan</span>
                </div>

                {/* Mouse Wheel - Zoom */}
                <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 shadow-sm border border-gray-border/50">
                    <div className="text-primary text-lg">🖱</div>
                    <div className="flex items-center gap-1 text-bright-turquoise-600">
                        <FaSearchMinus className="text-sm" />
                        <FaSearchPlus className="text-sm" />
                    </div>
                    <span className="text-gray-dark font-medium">Zoom</span>
                </div>

                {/* Click to Select */}
                <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 shadow-sm border border-gray-border/50">
                    <FaMousePointer className="text-primary text-lg" />
                    <div className="w-4 h-3 bg-bright-turquoise-300 rounded border border-bright-turquoise-400"></div>
                    <span className="text-gray-dark font-medium">Select</span>
                </div>
            </div>
        </div>
    );
};

export default CanvasNavigationTips;
