import { useState } from 'react'
import { uploadDocument, simplifyDocument, extractRequirements } from '../services/api'

export const useDocument = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [analysis, setAnalysis] = useState(null)

  const handleDocumentUpload = async (file) => {
    setLoading(true)
    setError(null)
    try {
      const res = await uploadDocument(file)
      return res.data.documentId
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleSimplifyDocument = async (documentId) => {
    setLoading(true)
    setError(null)
    try {
      const res = await simplifyDocument(documentId)
      setAnalysis(res.data.analysis)
      return res.data.analysis
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleExtractRequirements = async (documentId) => {
    setLoading(true)
    setError(null)
    try {
      const res = await extractRequirements(documentId)
      return res.data.requirements
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    analysis,
    handleDocumentUpload,
    handleSimplifyDocument,
    handleExtractRequirements
  }
}
