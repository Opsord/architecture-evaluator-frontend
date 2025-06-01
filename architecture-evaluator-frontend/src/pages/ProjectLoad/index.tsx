import { useState } from 'react'
import UploadForm from './components/UploadForm'
import GitHubForm from './components/GitHubForm'
import OptionSelector from './components/OptionSelector'

function ProjectLoad() {
    const [activeTab, setActiveTab] = useState<'zip' | 'github'>('zip')

    return (
        <div className="grid grid-cols-5 grid-rows-6 gap-4 h-max rounded-xl shadow p-8">
            {/* Title */}
            <div className="col-span-5">
                <h1 className="text-4xl font-bold text-center text-primary">
                    Load your project
                </h1>
                <p className="text-lg text-gray-medium text-center mt-4">
                    Choose how you want to load your project for analysis.
                </p>
            </div>
            {/* Selector (left section) */}
            <div className="col-span-2 row-span-4 row-start-3 flex flex-col items-center">
                <OptionSelector value={activeTab} onChange={setActiveTab} />
            </div>
            {/* Form (right section) */}
            <div className="col-span-2 row-span-4 col-start-4 row-start-3 flex flex-col items-center">
                <div className="w-full h-full">
                    {activeTab === 'zip' ? <UploadForm /> : <GitHubForm />}
                </div>
            </div>
        </div>
    )
}

export default ProjectLoad

