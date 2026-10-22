const express = require('express');
const router = express.Router();
const { 
    getAllUsers, 
    updateUser, 
    deleteUser, 
    getAllAppointmentsAdmin 
} = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Rutas protegidas exclusivamente para Administrador
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.put('/users/:id', authMiddleware, adminMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);
router.get('/appointments', authMiddleware, adminMiddleware, getAllAppointmentsAdmin);

module.exports = router;