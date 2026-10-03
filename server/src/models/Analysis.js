// Document Analysis Model
const analysisSchema = {
  id: String,
  documentId: String,
  documentType: String,
  purpose: String,
  simpleSummary: String,
  actionItems: [String],
  deadlines: [{
    description: String,
    date: Date,
    daysRemaining: Number
  }],
  requiredDocuments: [{
    name: String,
    status: String // 'required', 'optional'
  }],
  warnings: [String],
  eligibilityConditions: [String],
  extractedInfo: Object,
  language: String, // 'en' or 'hi'
  source: String, // 'Uploaded document'
  createdAt: Date,
  updatedAt: Date
};

module.exports = analysisSchema;
