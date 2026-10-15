const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // <-- 1. Importamos path para manejar rutas de carpetas
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 2. CONFIGURACIÓN DE ARCHIVOS ESTÁTICOS (Esto hace que cargue tu index.html y dashboard.html)
// Usamos '../public' si tu archivo index.js está dentro de la carpeta 'src'
app.use(express.static(path.join(__dirname, '../public')));

// Importar Rutas de la API
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

// Usar Rutas
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// Ruta de prueba raíz (para que aparezca el mensaje de que la API funciona)
app.get('/', (req, res) => {
    res.json({ message: "API de Citas Médicas funcionando correctamente" });
});

// Conexión a MongoDB Atlas y arranque del servidor
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Conectado a MongoDB Atlas con éxito');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error.message);
    });