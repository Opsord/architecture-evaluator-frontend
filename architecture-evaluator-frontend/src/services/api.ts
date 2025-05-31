import axios from 'axios'

// Instancia de axios con configuración base
const api = axios.create({
    baseURL: '/api/orchestrator', // Cambia si tu backend está en otro host/puerto
    headers: {
        'Accept': 'application/json',
    },
})

// Analizar proyecto por path local
export const analyzeProject = (projectPath: string, includeNonInternalDependencies = false) =>
    api.post('/analyze', null, {
        params: { projectPath, includeNonInternalDependencies }
    })

// Analizar proyecto subido (archivo ZIP)
export const analyzeProjectUpload = (file: File, includeNonInternalDependencies = false) => {
    const formData = new FormData()
    formData.append('project', file)
    formData.append('includeNonInternalDependencies', String(includeNonInternalDependencies))
    return api.post('/analyze-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

// Analizar repositorio de GitHub
export const analyzeGitHubRepo = (repoUrl: string, includeNonInternalDependencies = false) =>
    api.post('/analyze-github', null, {
        params: { repoUrl, includeNonInternalDependencies }
    })