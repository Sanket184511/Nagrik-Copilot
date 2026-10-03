import { useState } from 'react'
import { checkReadiness, compareDocuments } from '../services/api'

export const useReadiness = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [readiness, setReadiness] = useState(null)

  const handleCheckReadiness = async (documentIds, requirements) => {
    setLoading(true)
    setError(null)
    try {
      const res = await checkReadiness(documentIds, requirements)
      setReadiness(res.data.readiness)
      return res.data.readiness
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleCompareDocuments = async (documentIds) => {
    setLoading(true)
    setError(null)
    try {
      const res = await compareDocuments(documentIds)
      return res.data.comparison
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
    readiness,
    handleCheckReadiness,
    handleCompareDocuments
  }
}
