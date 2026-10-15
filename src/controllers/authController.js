const User = require('../models/User'); // Ajusta la ruta a tu modelo de Usuario si es distinta
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar Usuario (Paciente o Doctor)
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validar campos obligatorios
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Por favor, completa todos los campos obligatorios." });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El correo electrónico ya está registrado." });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear el nuevo usuario asignando el rol recibido (por defecto 'patient' si no se envía)
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role && ['patient', 'doctor'].includes(role) ? role : 'patient'
        });

        await newUser.save();

        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ message: "Error en el servidor al registrar el usuario", error: error.message });
    }
};

// Iniciar Sesión
const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Buscar al usuario por correo
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Correo o contraseña incorrectos" });
        }

        // Validar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Correo o contraseña incorrectos" });
        }

        // Opcional: Validar que el rol con el que intenta entrar coincida con el de la base de datos
        if (role && user.role && user.role !== role) {
            return res.status(400).json({ message: `Este usuario está registrado como ${user.role}, no como ${role}` });
        }

        // Crear token JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'secreto_super_seguro',
            { expiresIn: '1d' }
        );

        res.json({
            message: "Inicio de sesión exitoso",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: "Error en el servidor al iniciar sesión", error: error.message });
    }
};

// Obtener lista de doctores (para el selector del paciente)
const getDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' }).select('-password');
        res.json(doctors);
    } catch (error) {
        console.error("Error al obtener doctores:", error);
        res.status(500).json({ message: "Error al obtener la lista de médicos" });
    }
};

module.exports = {
    register,
    login,
    getDoctors
};