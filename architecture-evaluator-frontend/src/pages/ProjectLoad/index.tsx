import { useState } from 'react'
import UploadForm from './components/UploadForm'
import GitHubForm from './components/GitHubForm'
import OptionSelector from './components/OptionSelector'

function ProjectLoad() {
    const [activeTab, setActiveTab] = useState<'zip' | 'github'>('zip')

    return (
        <div className="flex flex-col items-center min-h-[80vh] py-12 px-4">
            {/* Title */}
            <div className="w-full max-w-4xl mb-10">
                <h1 className="text-5xl font-extrabold text-center text-primary drop-shadow-lg">
                    Load your project
                </h1>
                <p className="text-lg text-gray-medium text-center mt-4">
                    Choose how you want to load your project for analysis.
                </p>
            </div>
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Selector (left section) */}
                <div className="flex items-center justify-center">
                    <div className="w-full h-full max-w-md bg-gradient-to-br from-white/70 to-gray-100/70 backdrop-blur-lg border border-gray-border rounded-2xl shadow-xl p-8 flex flex-col justify-center">
                        <OptionSelector value={activeTab} onChange={setActiveTab} />
                    </div>
                </div>
                {/* Form (right section) */}
                <div className="flex items-center justify-center">
                    <div className="w-full h-full max-w-md bg-gradient-to-br from-white/80 to-bright-turquoise-50/80 backdrop-blur-lg border border-gray-border rounded-2xl shadow-xl p-8 flex flex-col justify-center">
                        {activeTab === 'zip' ? <UploadForm /> : <GitHubForm />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectLoad