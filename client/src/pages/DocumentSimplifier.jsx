import { useState } from 'react'
import { Upload, ArrowLeft, Loader } from 'lucide-react'
import DocumentUpload from '../components/DocumentUpload'
import DocumentSummary from '../components/DocumentSummary'

export default function DocumentSimplifier({ onBack }) {
  const [step, setStep] = useState('upload') // 'upload' or 'processing' or 'result'
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async (file) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('document', file)

      const uploadRes = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      })

      const uploadData = await uploadRes.json()

      if (uploadData.success) {
        const simplifyRes = await fetch('/api/documents/simplify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ documentId: uploadData.documentId })
        })

        const analysisData = await simplifyRes.json()
        setAnalysis(analysisData.analysis)
        setStep('result')
      }
    } catch (error) {
      console.error('Upload failed:', error)
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
        {step === 'upload' && (
          <DocumentUpload onUpload={handleUpload} loading={loading} />
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
