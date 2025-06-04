import { useState } from 'react'
import * as React from "react";
import { useNavigate } from 'react-router-dom'
import { analyzeGitHubRepo } from '../../../services/api'
import { useProjectContext } from '../../../context/ProjectContext' // <-- Add this

export default function GitHubForm() {
    const [repoUrl, setRepoUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { setProjectData } = useProjectContext() // <-- Add this

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!repoUrl) return

        setIsLoading(true)
        try {
            const response = await analyzeGitHubRepo(repoUrl)
            setProjectData(response.data) // <-- Set context
            navigate('/dashboard')
        } catch (error) {
            console.error('Error:', error)
            alert('Error al procesar el repositorio')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL of the GitHub repository
                </label>
                <input
                    type="url"
                    placeholder="https://github.com/user/repository"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <button
                type="submit"
                disabled={!repoUrl || isLoading}
                className={`px-4 py-2 rounded-md text-white ${
                    !repoUrl || isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {isLoading ? 'Processing...' : 'Clone and Analyze'}
            </button>
        </form>
    )
}