import { AlertCircle, CheckCircle, Clock } from 'lucide-react'

export default function DocumentSummary({ analysis }) {
  return (
    <div className="space-y-6">
      {/* Alert */}
      <div className="card border-l-4 border-red-500 bg-red-50">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-red-800">🔴 ACTION REQUIRED</h3>
            <p className="text-red-700 mt-2">{analysis.simpleSummary}</p>
          </div>
        </div>
      </div>

      {/* Document Overview */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Document Summary</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Document Type</p>
            <p className="font-semibold text-lg">{analysis.documentType}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Purpose</p>
            <p className="font-semibold text-lg">{analysis.purpose}</p>
          </div>
        </div>
      </div>

      {/* Deadlines */}
      {analysis.deadlines && analysis.deadlines.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            📅 Important Dates
          </h3>
          {analysis.deadlines.map((deadline, idx) => (
            <div key={idx} className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-gray-600 text-sm">{deadline.description}</p>
              <p className="font-bold text-lg text-gov-blue">
                {new Date(deadline.date).toLocaleDateString('en-IN')}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {deadline.daysRemaining} days remaining
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Action Items */}
      {analysis.actionItems && analysis.actionItems.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">👉 What to Do Next</h3>
          <ol className="space-y-3">
            {analysis.actionItems.map((item, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="font-bold text-gov-blue flex-shrink-0">{idx + 1}.</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Required Documents */}
      {analysis.requiredDocuments && analysis.requiredDocuments.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">📄 Required Documents</h3>
          <div className="space-y-2">
            {analysis.requiredDocuments.map((doc, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-gov-green" />
                <span className="text-gray-700">{doc.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Source */}
      <div className="text-sm text-gray-500 text-center">
        Source: {analysis.source}
      </div>
    </div>
  )
}
