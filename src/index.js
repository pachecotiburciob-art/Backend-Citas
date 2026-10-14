const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Cargar variables de entorno
dotenv.config();

// Inicializar Express
const app = express();

// Middlewares globales
app.use(express.json());
app.use(cors());

// Conectar a la Base de Datos (MongoDB Atlas)
connectDB();

// Rutas principales de la API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

// Ruta de prueba para verificar que el servidor responde
app.get('/', (req, res) => {
    res.json({ message: 'API de Citas Médicas funcionando correctamente' });
});

// Definir el puerto (Railway asigna uno automáticamente o usa el 4000 por defecto localmente)
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});