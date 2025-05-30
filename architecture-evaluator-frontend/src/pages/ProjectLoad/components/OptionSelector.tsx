import React from 'react';

interface OptionSelectorProps {
    value: 'zip' | 'github';
    onChange: (value: 'zip' | 'github') => void;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({ value, onChange }) => {
    return (
        <div className="w-[300px] px-4 py-5 bg-white flex flex-col gap-3 rounded-md shadow-[0px_0px_15px_rgba(0,0,0,0.09)]">
            <legend className="text-xl font-semibold mb-3 select-none">Selecciona una opción</legend>
            <label htmlFor="upload-zip" className={`font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg select-none ${value === 'zip' ? 'text-blue-500 bg-blue-50 ring-blue-300 ring-1' : ''}` }>
                <div className="w-5">
                    {/* ZIP icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.828A2 2 0 0 0 19.414 8l-5.414-5.414A2 2 0 0 0 12.172 2H6zm6 1.414L18.586 10H17a1 1 0 0 1-1-1V3.414zM8 12h2v2H8v-2zm0 3h2v2H8v-2zm0-6h2v2H8V9zm0-3h2v2H8V6z"/></svg>
                </div>
                Upload project ZIP
                <input
                    type="radio"
                    name="projectSource"
                    className="peer/zip w-4 h-4 absolute accent-current right-3"
                    id="upload-zip"
                    checked={value === 'zip'}
                    onChange={() => onChange('zip')}
                />
            </label>
            <label htmlFor="github-link" className={`font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg select-none ${value === 'github' ? 'text-blue-500 bg-blue-50 ring-blue-300 ring-1' : ''}` }>
                <div className="w-5">
                    {/* GitHub icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
                </div>
                Get from GitHub
                <input
                    type="radio"
                    name="projectSource"
                    className="w-4 h-4 absolute accent-current right-3"
                    id="github-link"
                    checked={value === 'github'}
                    onChange={() => onChange('github')}
                />
            </label>
        </div>
    );
}

export default OptionSelector;
