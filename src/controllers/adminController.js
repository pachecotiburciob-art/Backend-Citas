const User = require('../models/User');
const Appointment = require('../models/Appointment');

// Obtener todos los usuarios (Pacientes y Médicos)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
};

// Actualizar rol o datos de un usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        if (role && !['patient', 'doctor', 'admin'].includes(role)) {
            return res.status(400).json({ message: "Rol no válido" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, role },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario actualizado con éxito", user: updatedUser });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ message: "Error al actualizar el usuario" });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Eliminar también las citas asociadas a este usuario
        await Appointment.deleteMany({ $or: [{ patient: id }, { doctor: id }] });

        res.json({ message: "Usuario y sus citas asociadas eliminados correctamente" });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ message: "Error al eliminar el usuario" });
    }
};

// Obtener todas las citas del sistema para el administrador
const getAllAppointmentsAdmin = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('patient', 'name email')
            .populate('doctor', 'name email')
            .sort({ date: 1 });

        res.json(appointments);
    } catch (error) {
        console.error("Error al obtener todas las citas:", error);
        res.status(500).json({ message: "Error al obtener las citas del sistema" });
    }
};

module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
    getAllAppointmentsAdmin
};