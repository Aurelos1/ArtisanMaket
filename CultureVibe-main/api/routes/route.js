const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const statController = require('../controllers/statController');

// Loisir
router.get('/loisirs', controller.getLoisir);
router.get('/loisir/:id', controller.getLoisirById);
router.post('/loisir', controller.createLoisir);

// Notation
router.post('/notation', controller.createNotation);
router.get('/notation/:id', controller.getNotation);

// Category
router.get('/category', controller.getCategory);
router.get('/category/:id', controller.getCategoryById);
router.post('/category', controller.createCategory);

// Statistique
router.get('/topLoisir', statController.getTopLoisir);
router.get('/topLoisirByCategory/:id', statController.getTopLoisirByCategory);

module.exports = router;