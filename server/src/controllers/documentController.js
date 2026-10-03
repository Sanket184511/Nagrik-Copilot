const documentService = require('../services/documentService');
const aiService = require('../services/aiService');

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const documentData = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size
    };

    const savedDocument = await documentService.saveDocumentMetadata(documentData);

    res.json({
      success: true,
      documentId: savedDocument.id,
      message: 'Document uploaded successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.simplifyDocument = async (req, res) => {
  try {
    const { documentId } = req.body;

    if (!documentId) {
      return res.status(400).json({ error: 'Document ID is required' });
    }

    const document = await documentService.getDocumentById(documentId);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const simplifiedContent = await aiService.simplifyDocument(document.filePath);

    const analysis = await documentService.saveAnalysis({
      documentId,
      ...simplifiedContent
    });

    res.json({
      success: true,
      analysis: analysis
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.extractRequirements = async (req, res) => {
  try {
    const { documentId } = req.body;

    if (!documentId) {
      return res.status(400).json({ error: 'Document ID is required' });
    }

    const document = await documentService.getDocumentById(documentId);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const requirements = await aiService.extractRequirements(document.filePath);

    res.json({
      success: true,
      requirements: requirements
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const { documentId } = req.params;

    await documentService.deleteDocument(documentId);

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalysis = async (req, res) => {
  try {
    const { analysisId } = req.params;

    const analysis = await documentService.getAnalysisById(analysisId);

    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.json({
      success: true,
      analysis: analysis
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
