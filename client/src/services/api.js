import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Document APIs
export const uploadDocument = (file) => {
  const formData = new FormData()
  formData.append('document', file)
  return api.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const simplifyDocument = (documentId) => {
  return api.post('/documents/simplify', { documentId })
}

export const extractRequirements = (documentId) => {
  return api.post('/documents/extract', { documentId })
}

export const deleteDocument = (documentId) => {
  return api.delete(`/documents/${documentId}`)
}

export const getAnalysis = (analysisId) => {
  return api.get(`/documents/analysis/${analysisId}`)
}

// Readiness APIs
export const checkReadiness = (documentIds, requirements) => {
  return api.post('/readiness/check', { documentIds, requirements })
}

export const compareDocuments = (documentIds) => {
  return api.post('/readiness/compare', { documentIds })
}

export const getReadinessReport = (checkId) => {
  return api.get(`/readiness/report/${checkId}`)
}

export default api
