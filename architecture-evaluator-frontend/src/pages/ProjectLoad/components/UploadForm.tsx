import { useEffect, useRef, useState } from 'react'
import * as React from "react";
import { useNavigation } from '../../../context/NavigationContext'
import { analyzeProjectUpload } from '../../../services/api'
import { useProjectContext } from '../../../context/ProjectContext'

export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const { setCurrentPage } = useNavigation()
    const { setProjectData } = useProjectContext()
    const abortRef = useRef<AbortController | null>(null)

    useEffect(() => () => abortRef.current?.abort(), [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return

        abortRef.current?.abort()
        const controller = new AbortController()
        abortRef.current = controller

        setIsUploading(true)
        try {
            const response = await analyzeProjectUpload(file, controller.signal)
            setProjectData(response.data)
            setCurrentPage('dashboard')
        } catch (error) {
            if (axiosIsCanceled(error)) {
                return
            }
            console.error('Error uploading:', error)
            alert('Error al subir el proyecto')
        } finally {
            if (abortRef.current === controller) {
                setIsUploading(false)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <label className="block text-lg font-semibold text-primary mb-2">
                    Project ZIP file
                </label>
                <input
                    type="file"
                    accept=".zip"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="block w-full text-base text-gray-700
                        file:mr-4 file:py-3 file:px-6
                        file:rounded-lg file:border-0
                        file:text-base file:font-semibold
                        file:bg-bright-turquoise-100 file:text-primary
                        hover:file:bg-bright-turquoise-200"
                />
            </div>
            <button
                type="submit"
                disabled={!file || isUploading}
                className={`w-full py-4 text-xl rounded-lg font-bold transition text-white ${
                    !file || isUploading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary to-bright-turquoise-400 hover:scale-105 hover:shadow-xl'
                }`}
            >
                {isUploading ? 'Uploading...' : 'Analyze project'}
            </button>
        </form>
    )
}

function axiosIsCanceled(error: unknown): boolean {
    return typeof error === 'object' && error !== null && 'code' in error && (error as { code?: string }).code === 'ERR_CANCELED'
}
