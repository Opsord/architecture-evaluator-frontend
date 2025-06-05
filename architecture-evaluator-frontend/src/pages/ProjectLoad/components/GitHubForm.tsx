import { useState } from 'react'
import * as React from "react";
import { useNavigate } from 'react-router-dom'
import { analyzeGitHubRepo } from '../../../services/api'
import { useProjectContext } from '../../../context/ProjectContext'

export default function GitHubForm() {
    const [repoUrl, setRepoUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { setProjectData } = useProjectContext()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!repoUrl) return

        setIsLoading(true)
        try {
            const response = await analyzeGitHubRepo(repoUrl)
            setProjectData(response.data)
            navigate('/dashboard')
        } catch (error) {
            console.error('Error:', error)
            alert('Error al procesar el repositorio')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <label className="block text-lg font-semibold text-primary mb-2">
                    GitHub repository URL
                </label>
                <input
                    type="url"
                    placeholder="https://github.com/user/repository"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                />
            </div>
            <button
                type="submit"
                disabled={!repoUrl || isLoading}
                className={`w-full py-4 text-xl rounded-lg font-bold transition text-white ${
                    !repoUrl || isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary to-bright-turquoise-400 hover:scale-105 hover:shadow-xl'
                }`}
            >
                {isLoading ? 'Processing...' : 'Clone and Analyze'}
            </button>
        </form>
    )
}