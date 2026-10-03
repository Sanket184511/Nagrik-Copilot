const express = require('express');
const router = express.Router();
const upload = require('../config/uploadConfig');
const documentController = require('../controllers/documentController');

// Upload document
router.post('/upload', upload.single('document'), documentController.uploadDocument);

// Simplify document
router.post('/simplify', documentController.simplifyDocument);

// Extract requirements from document
router.post('/extract', documentController.extractRequirements);

// Get analysis
router.get('/analysis/:analysisId', documentController.getAnalysis);

// Delete document
router.delete('/:documentId', documentController.deleteDocument);

module.exports = router;
