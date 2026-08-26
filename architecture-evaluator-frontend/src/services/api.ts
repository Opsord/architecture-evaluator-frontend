import axios from 'axios'
import type { ProjectAnalysisDTO } from '../types/ProjectAnalysisInstance.ts'

const api = axios.create({
    baseURL: '/api/orchestrator',
    timeout: 180_000,
    headers: {
        'Accept': 'application/json',
    },
})

export const analyzeProjectUpload = (
    file: File,
    signal?: AbortSignal,
): Promise<{data: ProjectAnalysisDTO}> => {
    const formData = new FormData()
    formData.append('project', file)

    return api.post('/analyze-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        signal,
    })
}

export const analyzeGitHubRepo = (
    repoUrl: string,
    signal?: AbortSignal,
): Promise<{data: ProjectAnalysisDTO}> =>
    api.post('/analyze-github', null, {
        params: { repoUrl },
        signal,
    })
