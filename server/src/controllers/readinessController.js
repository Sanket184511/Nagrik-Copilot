const readinessService = require('../services/readinessService');
const aiService = require('../services/aiService');

exports.checkReadiness = async (req, res) => {
  try {
    const { documentIds, requirements } = req.body;

    if (!documentIds || !Array.isArray(documentIds) || documentIds.length === 0) {
      return res.status(400).json({ error: 'Document IDs are required' });
    }

    if (!requirements || !Array.isArray(requirements) || requirements.length === 0) {
      return res.status(400).json({ error: 'Requirements are required' });
    }

    const readinessCheck = await readinessService.performReadinessCheck(
      documentIds,
      requirements
    );

    res.json({
      success: true,
      readiness: readinessCheck
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.compareDocuments = async (req, res) => {
  try {
    const { documentIds } = req.body;

    if (!documentIds || !Array.isArray(documentIds) || documentIds.length < 2) {
      return res.status(400).json({ error: 'At least 2 document IDs are required' });
    }

    const comparison = await aiService.compareDocuments(documentIds);

    res.json({
      success: true,
      comparison: comparison
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReadinessReport = async (req, res) => {
  try {
    const { checkId } = req.params;

    const report = await readinessService.getReadinessCheckById(checkId);

    if (!report) {
      return res.status(404).json({ error: 'Readiness check not found' });
    }

    res.json({
      success: true,
      report: report
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
