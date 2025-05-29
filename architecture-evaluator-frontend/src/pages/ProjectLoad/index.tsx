import { useState } from 'react'
import UploadForm from './components/UploadForm'
import GitHubForm from './components/GitHubForm'

export default function ProjectLoad() {
    const [activeTab, setActiveTab] = useState<'zip' | 'github'>('zip')

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Subir proyecto</h1>

            <div className="flex border-b mb-6">
                <button
                    className={`py-2 px-4 font-medium focus:outline-none transition-colors duration-150 ${
                        activeTab === 'zip'
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('zip')}
                >
                    Subir ZIP
                </button>
                <button
                    className={`py-2 px-4 font-medium focus:outline-none transition-colors duration-150 ${
                        activeTab === 'github'
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('github')}
                >
                    GitHub
                </button>
            </div>

            <div className="mt-6">
                {activeTab === 'zip' ? <UploadForm /> : <GitHubForm />}
            </div>
        </div>
    )
}

