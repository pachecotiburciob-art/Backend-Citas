const express = require('express');
const router = express.Router();
const {
    createAppointment,
    getAppointments,
    updateAppointment,
    deleteAppointment
} = require('../controllers/appointmentcontroller');
const verifyToken = require('../middlewares/authMiddleware');

// Todas estas rutas requieren que el usuario haya iniciado sesión
router.get('/', verifyToken, getAppointments);
router.post('/', verifyToken, createAppointment);
router.put('/:id', verifyToken, updateAppointment);
router.delete('/:id', verifyToken, deleteAppointment);

module.exports = router;