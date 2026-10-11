const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); // Importamos la conexión a MongoDB

const app = express();
const PORT = process.env.PORT || 4000;

// Conectar a MongoDB Atlas
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend (carpeta public)
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la API
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// Ruta comodín para que el frontend cargue correctamente
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});