import { useState } from 'react'
import { ArrowLeft, Loader } from 'lucide-react'
import DocumentUpload from '../components/DocumentUpload'
import ReadinessReport from '../components/ReadinessReport'
import { DEMO_MODE, delay, mockReadiness, mockUploadedFiles } from '../data/mockData'

export default function ReadinessChecker({ onBack }) {
  const [step, setStep] = useState('upload') // 'upload' or 'processing' or 'result'
  const [readiness, setReadiness] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleUpload = async (file) => {
    setLoading(true)
    try {
      if (DEMO_MODE) {
        await delay(800)
        const next = mockUploadedFiles[uploadedFiles.length]
        setUploadedFiles([...uploadedFiles, next ? { ...next, name: file.name } : { id: `demo-${Date.now()}`, name: file.name }])
        return
      }
      const formData = new FormData()
      formData.append('document', file)

      const uploadRes = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      })

      const uploadData = await uploadRes.json()

      if (uploadData.success) {
        setUploadedFiles([...uploadedFiles, { id: uploadData.documentId, name: file.name }])
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckReadiness = async () => {
    setLoading(true)
    try {
      if (DEMO_MODE) {
        await delay(2500)
        setReadiness(mockReadiness)
        setStep('result')
        return
      }
      const requirements = [
        { id: '1', name: 'Identity Proof' },
        { id: '2', name: 'Income Certificate' },
        { id: '3', name: 'Residence Proof' },
        { id: '4', name: 'Photograph' },
        { id: '5', name: 'Bank Details' }
      ]

      const documentIds = uploadedFiles.map(f => f.id)

      const checkRes = await fetch('/api/readiness/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentIds, requirements })
      })

      const readinessData = await checkRes.json()
      setReadiness(readinessData.readiness)
      setStep('result')
    } catch (error) {
      console.error('Readiness check failed:', error)
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
          📋 Check My Documents
        </h1>

        {/* Upload State */}
        {step === 'upload' && (
          <div>
            <DocumentUpload
              onUpload={handleUpload}
              loading={loading}
              multiple={true}
            />

            {uploadedFiles.length > 0 && (
              <div className="card mt-8">
                <h2 className="text-xl font-bold mb-4">Uploaded Documents</h2>
                <ul className="space-y-2 mb-6">
                  {uploadedFiles.map((file, idx) => (
                    <li key={idx} className="text-gray-700">
                      ✓ {file.name}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleCheckReadiness}
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? 'Checking...' : 'Check Readiness'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Processing State */}
        {loading && (
          <div className="card text-center">
            <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-gov-blue" />
            <p className="text-gray-600">Analyzing your documents...</p>
          </div>
        )}

        {/* Result State */}
        {step === 'result' && readiness && (
          <ReadinessReport readiness={readiness} />
        )}
      </div>
    </div>
  )
}
