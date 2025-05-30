import { useState } from 'react'
import UploadForm from './components/UploadForm'
import GitHubForm from './components/GitHubForm'
import OptionSelector from './components/OptionSelector'

function ProjectLoad() {
    const [activeTab, setActiveTab] = useState<'zip' | 'github'>('zip')

    return (
        <div className="grid grid-cols-5 grid-rows-5 gap-4 max-w-4xl mx-auto rounded-xl shadow p-8 bg-gray-800">
            {/* Title */}
            <div className="col-span-5">
                <h1 className="text-2xl font-bold mb-6 text-center">Subir proyecto</h1>
            </div>
            {/* Selector (left section) */}
            <div className="col-span-2 row-span-4 row-start-2 flex flex-col items-center">
                <OptionSelector value={activeTab} onChange={setActiveTab} />
            </div>
            {/* Form (right section) */}
            <div className="col-span-2 row-span-4 col-start-4 row-start-2 flex items-start">
                <div className="w-full h-full">
                    {activeTab === 'zip' ? <UploadForm /> : <GitHubForm />}
                </div>
            </div>
        </div>
    )
}

export default ProjectLoad

