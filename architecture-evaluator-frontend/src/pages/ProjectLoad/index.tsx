import { useState } from 'react'
import UploadForm from './components/UploadForm'
import GitHubForm from './components/GitHubForm'
import OptionSelector from './components/OptionSelector'

function ProjectLoad() {
    const [activeTab, setActiveTab] = useState<'zip' | 'github'>('zip')

    return (
        <div className="grid grid-cols-5 grid-rows-6 gap-6 h-max">
            {/* Title */}
            <div className="col-span-5 mb-8">
                <h1 className="text-5xl font-extrabold text-center text-primary drop-shadow-lg">
                    Load your project
                </h1>
                <p className="text-lg text-gray-medium text-center mt-4">
                    Choose how you want to load your project for analysis.
                </p>
            </div>
            {/* Selector (left section) */}
            <div className="col-span-2 row-span-4 row-start-3 flex items-center justify-center h-full">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full h-full max-w-md bg-gradient-to-br from-white/70 to-gray-100/70 backdrop-blur-lg border border-gray-border rounded-2xl shadow-xl p-8 flex flex-col justify-center">
                        <OptionSelector value={activeTab} onChange={setActiveTab} />
                    </div>
                </div>
            </div>
            {/* Form (right section) */}
            <div className="col-span-2 row-span-4 col-start-4 row-start-3 flex items-center justify-center h-full">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full h-full max-w-md bg-gradient-to-br from-white/80 to-bright-turquoise-50/80 backdrop-blur-lg border border-gray-border rounded-2xl shadow-xl p-8 flex flex-col justify-center">
                        {activeTab === 'zip' ? <UploadForm /> : <GitHubForm />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectLoad