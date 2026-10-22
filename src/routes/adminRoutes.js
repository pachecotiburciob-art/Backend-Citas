const express = require('express');
const router = express.Router();
const { 
    getAllUsers, 
    createUserByAdmin,
    updateUser, 
    deleteUser, 
    getAllAppointmentsAdmin 
} = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.post('/users', authMiddleware, adminMiddleware, createUserByAdmin);
router.put('/users/:id', authMiddleware, adminMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);
router.get('/appointments', authMiddleware, adminMiddleware, getAllAppointmentsAdmin);

module.exports = router;