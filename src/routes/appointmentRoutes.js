const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, updateAppointmentStatus } = require('../controllers/appointmentcontroller');
const authMiddleware = require('../middlewares/authMiddleware'); // Carpeta en plural (middlewares)

router.post('/', authMiddleware, createAppointment);
router.get('/', authMiddleware, getAppointments);
router.put('/:id/status', authMiddleware, updateAppointmentStatus);

module.exports = router;