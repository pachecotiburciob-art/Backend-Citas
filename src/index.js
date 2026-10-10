import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js'; // <-- 1. Importar la función de conexión
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

dotenv.config();

const app = express();

// 2. Ejecutar la conexión a MongoDB Atlas
conectarDB();

// Middleware para procesar JSON en las peticiones
app.use(express.json());

app.use(express.static('public'));

// Rutas principales de la API
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});