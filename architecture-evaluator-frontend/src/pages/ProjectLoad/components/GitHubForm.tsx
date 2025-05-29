import { useState } from 'react'
import * as React from "react";

export default function GitHubForm() {
    const [repoUrl, setRepoUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!repoUrl) return

        setIsLoading(true)
        try {
            // Aquí iría la llamada a tu backend
            // await analyzeGitHubRepo(repoUrl)
            alert('Repositorio en análisis!')
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
                    URL del repositorio GitHub
                </label>
                <input
                    type="url"
                    placeholder="https://github.com/usuario/repositorio"
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
                {isLoading ? 'Procesando...' : 'Clonar y analizar'}
            </button>
        </form>
    )
}