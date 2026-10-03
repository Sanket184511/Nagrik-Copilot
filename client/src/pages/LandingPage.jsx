import { FileText, CheckCircle, ArrowRight } from 'lucide-react'

export default function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gov-blue mb-4">
            🇮🇳 NAGRIK COPILOT
          </h1>
          <p className="text-2xl text-gray-700 mb-2">
            Understand. Prepare. Act.
          </p>
          <p className="text-lg text-gray-600">
            Government documents shouldn't feel like a different language.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          {/* Understand Document Card */}
          <div
            onClick={() => onNavigate('simplify')}
            className="card cursor-pointer hover:shadow-lg transition transform hover:scale-105"
          >
            <div className="flex items-center justify-center mb-4">
              <FileText className="w-12 h-12 text-gov-blue" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
              📄 Understand a Document
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Upload a government notice, application or PDF and get a simple explanation.
            </p>
            <div className="flex justify-center">
              <button className="btn-primary flex items-center gap-2">
                Upload Document
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Check Documents Card */}
          <div
            onClick={() => onNavigate('readiness')}
            className="card cursor-pointer hover:shadow-lg transition transform hover:scale-105"
          >
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-gov-green" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
              📋 Check My Documents
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Check whether you're ready for a government application.
            </p>
            <div className="flex justify-center">
              <button className="btn-primary flex items-center gap-2">
                Start Check
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-12 max-w-2xl text-center px-4 py-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-gray-700">
            <strong>⚠️ Privacy Notice:</strong> Your documents may contain sensitive personal information.
            Upload only documents necessary for this service.
          </p>
        </div>
      </div>
    </div>
  )
}
