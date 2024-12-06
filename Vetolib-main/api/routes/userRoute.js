const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middlewares/middleware');
const {validateLoginData, validateRegisterData} = require('../middlewares/middlwareValidateData');


router.post('/auth/login', validateLoginData, userController.login);
router.get('/', middleware.authenticator,userController.getAllUsers);
router.post('/', validateRegisterData, userController.createUser); 
router.get('/:id', userController.getUserById);
router.put('/:id', middleware.authenticator, userController.updateUser); 
router.delete('/:id', middleware.authenticator,  userController.deleteUser);

module.exports = router;
