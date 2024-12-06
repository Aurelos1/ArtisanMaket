const express = require('express');
const animalController = require('../controllers/animalController');
const router = express.Router();
const middleware = require('../middlewares/middleware');


// Route pour obtenir tous les animaux
router.get('/', middleware.authenticator, animalController.getAllAnimals);

// Route pour obtenir un animal par son ID
router.get('/:id', middleware.authenticator, animalController.getAnimalById);

// Route pour créer un nouvel animal
router.post('/',middleware.authenticator, animalController.addAnimal);

// Route pour mettre à jour un animal existant
router.put('/:id',middleware.authenticator, animalController.editAnimal);

// Route pour supprimer un animal
router.delete('/:id',middleware.authenticator, animalController.deleteAnimal);

router.get('/owner/:id',middleware.authenticator, animalController.getAnimalsByOwner);

module.exports = router;