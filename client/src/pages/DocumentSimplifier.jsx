import { useState } from 'react'
import { Upload, ArrowLeft, Loader } from 'lucide-react'
import DocumentUpload from '../components/DocumentUpload'
import DocumentSummary from '../components/DocumentSummary'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'

export default function DocumentSimplifier({ onBack }) {
  const [step, setStep] = useState('upload') // 'upload' or 'result'
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async (file) => {
    setLoading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('document', file)

      const uploadRes = await fetch(`${API}/documents/upload`, {
        method: 'POST',
        body: formData,
      })
      const uploadData = await uploadRes.json()
      if (!uploadRes.ok || !uploadData.success) {
        throw new Error(uploadData.message || uploadData.error || 'Upload failed')
      }

      const simplifyRes = await fetch(`${API}/documents/simplify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId: uploadData.documentId }),
      })
      const analysisData = await simplifyRes.json()
      if (!simplifyRes.ok) {
        throw new Error(analysisData.message || analysisData.error || 'Analysis failed')
      }

      setAnalysis(analysisData.analysis)
      setStep('result')
    } catch (err) {
      console.error('Upload failed:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gov-blue hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <h1 className="text-4xl font-bold text-gov-blue mb-8">
          📄 Understand a Document
        </h1>

        {/* Upload State */}
        {step === 'upload' && !loading && (
          <DocumentUpload onUpload={handleUpload} loading={loading} />
        )}
        {error && (
          <div className="card text-red-700 mb-4">
            {error}
          </div>
        )}
        {/* Processing State */}
        {loading && (
          <div className="card text-center">
            <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-gov-blue" />
            <p className="text-gray-600">Processing your document...</p>
          </div>
        )}

        {/* Result State */}
        {step === 'result' && analysis && (
          <DocumentSummary analysis={analysis} />
        )}
      </div>
    </div>
  )
}
