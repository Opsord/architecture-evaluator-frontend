import axios from 'axios'
import type { ProjectAnalysisDTO } from '../types/ProjectAnalysisInstance.ts'

// Axios instance with base configuration
const api = axios.create({
    baseURL: '/api/orchestrator',
    headers: {
        'Accept': 'application/json',
    },
})

// Analyze uploaded project (ZIP file)
export const analyzeProjectUpload = (file: File): Promise<{data: ProjectAnalysisDTO}> => {
    const formData = new FormData()
    formData.append('project', file)

    return api.post('/analyze-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

// Analyze GitHub repository
export const analyzeGitHubRepo = (repoUrl: string): Promise<{data: ProjectAnalysisDTO}> =>
    api.post('/analyze-github', null, {
        params: { repoUrl }
    })