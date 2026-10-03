const { v4: uuidv4 } = require('uuid');

// In-memory storage (replace with database later)
const documents = new Map();
const analyses = new Map();

exports.saveDocumentMetadata = async (documentData) => {
  const id = uuidv4();
  const document = {
    id,
    ...documentData,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  };

  documents.set(id, document);
  return document;
};

exports.getDocumentById = async (documentId) => {
  return documents.get(documentId);
};

exports.deleteDocument = async (documentId) => {
  const document = documents.get(documentId);
  if (document) {
    // Delete file from storage
    const fs = require('fs');
    if (fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }
    documents.delete(documentId);
  }
};

exports.saveAnalysis = async (analysisData) => {
  const id = uuidv4();
  const analysis = {
    id,
    ...analysisData,
    createdAt: new Date()
  };

  analyses.set(id, analysis);
  return analysis;
};

exports.getAnalysisById = async (analysisId) => {
  return analyses.get(analysisId);
};
