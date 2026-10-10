import express from 'express';
import { 
  registrarUsuario, 
  loginUsuario, 
  getProfile, 
  getDoctors 
} from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);

// Rutas protegidas y públicas de usuarios/doctores
router.get('/profile', verifyToken, getProfile);
router.get('/doctors', getDoctors);

export default router;