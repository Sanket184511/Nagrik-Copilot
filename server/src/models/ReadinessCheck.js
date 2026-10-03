// Readiness Check Model
const readinessCheckSchema = {
  id: String,
  documentIds: [String],
  requirements: [{
    id: String,
    name: String,
    status: String, // 'ready', 'attention', 'missing'
    explanation: String,
    documentId: String,
    detectedInfo: Object
  }],
  readyCount: Number,
  attentionCount: Number,
  missingCount: Number,
  totalRequirements: Number,
  readinessPercentage: Number,
  inconsistencies: [{
    field: String,
    documents: [String],
    values: [String],
    severity: String // 'warning', 'critical'
  }],
  actionPlan: [{
    priority: Number,
    action: String,
    status: String
  }],
  createdAt: Date,
  updatedAt: Date
};

module.exports = readinessCheckSchema;
