import React from 'react';
import { FaFileArchive, FaGithub } from "react-icons/fa";

interface OptionSelectorProps {
    value: 'zip' | 'github';
    onChange: (value: 'zip' | 'github') => void;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({ value, onChange }) => {
    return (
        <fieldset className="space-y-6">
            <legend className="text-2xl font-bold mb-6 text-primary select-none text-center">Select an option</legend>
            <label htmlFor="upload-zip" className={`flex items-center gap-4 px-5 py-5 rounded-xl cursor-pointer transition border-2 ${value === 'zip' ? 'border-primary bg-bright-turquoise-50/60 shadow-lg' : 'border-gray-200 bg-white/60 hover:bg-gray-100/80'}`}>
                <FaFileArchive className="text-3xl text-primary" />
                <span className="flex-1 text-lg font-medium">Upload project ZIP</span>
                <input
                    type="radio"
                    name="projectSource"
                    className="accent-primary w-5 h-5"
                    id="upload-zip"
                    checked={value === 'zip'}
                    onChange={() => onChange('zip')}
                />
            </label>
            <label htmlFor="github-link" className={`flex items-center gap-4 px-5 py-5 rounded-xl cursor-pointer transition border-2 ${value === 'github' ? 'border-primary bg-bright-turquoise-50/60 shadow-lg' : 'border-gray-200 bg-white/60 hover:bg-gray-100/80'}`}>
                <FaGithub className="text-3xl text-primary" />
                <span className="flex-1 text-lg font-medium">Get from GitHub</span>
                <input
                    type="radio"
                    name="projectSource"
                    className="accent-primary w-5 h-5"
                    id="github-link"
                    checked={value === 'github'}
                    onChange={() => onChange('github')}
                />
            </label>
        </fieldset>
    );
}

export default OptionSelector;