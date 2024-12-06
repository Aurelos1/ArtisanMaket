const express = require('express');
const router = express.Router();

const cabinetController = require('../controllers/cabinetController');
const middleware = require('../middlewares/middleware');

// Routes pour la table commentaire
router.get('/', /* authenticator,*/ cabinetController.getAllCabinets);
router.get('/:id', /* authenticator,*/ cabinetController.getCabinet);
router.post('/', middleware.authenticator, middleware.isPrpriétaire, cabinetController.addCabinet);
router.put('/:id', middleware.authenticator,middleware.isPrpriétaire, cabinetController.editCabinet);
router.delete('/:id', middleware.authenticator, cabinetController.deleteCabinet);
router.get('/owner/:id', middleware.authenticator, cabinetController.getUserByOwner);
router.get('/ownerCabinet/:id', middleware.authenticator, middleware.isPrpriétaire, cabinetController.getCabinetByOwner);

module.exports = router;