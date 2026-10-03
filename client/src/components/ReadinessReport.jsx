import { CheckCircle, AlertCircle, XCircle } from 'lucide-react'

export default function ReadinessReport({ readiness }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="w-5 h-5 text-gov-green" />
      case 'attention':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'missing':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready':
        return 'bg-green-50 border-green-200'
      case 'attention':
        return 'bg-yellow-50 border-yellow-200'
      case 'missing':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Readiness Summary */}
      <div className="card text-center">
        <h2 className="text-3xl font-bold text-gov-blue mb-4">
          APPLICATION READINESS
        </h2>

        <div className="text-6xl font-bold text-gov-blue mb-4">
          {readiness.readyCount} / {readiness.totalRequirements}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div
            className="bg-gov-green h-4 rounded-full transition-all duration-300"
            style={{ width: `${readiness.readinessPercentage}%` }}
          />
        </div>

        <p className="text-2xl font-semibold text-gray-700 mb-2">
          {readiness.readinessPercentage >= 80
            ? '✅ READY TO PROCEED'
            : readiness.readinessPercentage >= 50
            ? '⚠️ NEEDS ATTENTION'
            : '❌ NOT READY'}
        </p>
      </div>

      {/* Status Summary */}
      <div className="card">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-gov-green">
              {readiness.readyCount}
            </p>
            <p className="text-gray-600">✅ Ready</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-3xl font-bold text-yellow-500">
              {readiness.attentionCount}
            </p>
            <p className="text-gray-600">⚠️ Attention</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-3xl font-bold text-red-500">
              {readiness.missingCount}
            </p>
            <p className="text-gray-600">❌ Missing</p>
          </div>
        </div>
      </div>

      {/* Requirements Details */}
      <div className="card">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Document Requirements</h3>
        <div className="space-y-3">
          {readiness.requirements.map((req) => (
            <div
              key={req.id}
              className={`p-4 rounded-lg border flex items-start gap-4 ${getStatusColor(req.status)}`}
            >
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(req.status)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{req.name}</p>
                <p className="text-sm text-gray-600">{req.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inconsistencies */}
      {readiness.inconsistencies && readiness.inconsistencies.length > 0 && (
        <div className="card border-l-4 border-yellow-500">
          <h3 className="text-xl font-bold mb-4 text-yellow-800">
            ⚠️ Potential Inconsistencies
          </h3>
          {readiness.inconsistencies.map((inc, idx) => (
            <div key={idx} className="p-4 bg-yellow-50 rounded-lg mb-3">
              <p className="font-semibold text-gray-800">{inc.field}</p>
              <p className="text-sm text-gray-600 mt-1">
                Different values found across documents. Please verify before submission.
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Action Plan */}
      {readiness.actionPlan && readiness.actionPlan.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">📋 Your Next Steps</h3>
          <ol className="space-y-3">
            {readiness.actionPlan.map((action, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="font-bold text-gov-blue flex-shrink-0">
                  {idx + 1}.
                </span>
                <span className="text-gray-700">{action.action}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
