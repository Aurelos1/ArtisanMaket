// appointmentRoutes.js

const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const middleware = require('../middlewares/middleware');

router.get('/', middleware.authenticator, appointmentController.getAllAppointments);
router.get('/:id',  middleware.authenticator,  appointmentController.getAppointmentById);
router.post('/',  middleware.authenticator,  appointmentController.createAppointment);
router.put('/:id',  middleware.authenticator,  appointmentController.updateAppointment);
router.delete('/:id',  middleware.authenticator,  appointmentController.deleteAppointment);
router.get('/user/:userId', appointmentController.getAppointmentsByUserId);

module.exports = router;
