import express from 'express';
import { 
  obtenerCitas, 
  crearCita, 
  actualizarCita, 
  eliminarCita 
} from '../controllers/appointmentcontroller.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas estas rutas requerirán que el usuario haya iniciado sesión (verifyToken)
router.get('/', verifyToken, obtenerCitas);
router.post('/', verifyToken, crearCita);
router.put('/:id', verifyToken, actualizarCita);
router.delete('/:id', verifyToken, eliminarCita);

export default router;