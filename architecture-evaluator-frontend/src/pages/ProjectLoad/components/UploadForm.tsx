import { useState } from 'react'
import * as React from "react";
import { analyzeProjectUpload } from '../../../services/api'

export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return

        setIsUploading(true)
        try {
            await analyzeProjectUpload(file)
            alert('Proyecto subido con éxito!')
        } catch (error) {
            console.error('Error uploading:', error)
            alert('Error al subir el proyecto')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Archivo ZIP del proyecto
                </label>
                <input
                    type="file"
                    accept=".zip"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
                />
            </div>

            <button
                type="submit"
                disabled={!file || isUploading}
                className={`px-4 py-2 rounded-md text-white ${
                    !file || isUploading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {isUploading ? 'Subiendo...' : 'Analizar proyecto'}
            </button>
        </form>
    )
}