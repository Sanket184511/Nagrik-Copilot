const express = require('express');
const router = express.Router();
const readinessController = require('../controllers/readinessController');

// Check document readiness
router.post('/check', readinessController.checkReadiness);

// Compare documents for inconsistencies
router.post('/compare', readinessController.compareDocuments);

// Get readiness report
router.get('/report/:checkId', readinessController.getReadinessReport);

module.exports = router;
