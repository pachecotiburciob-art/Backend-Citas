const Appointment = require('../models/Appointment');

// Crear una cita (Create)
exports.createAppointment = async (req, res) => {
    try {
        const { doctor, date } = req.body;
        
        const newAppointment = new Appointment({
            patient: req.user.id, // Obtenido del token JWT del middleware de autenticación
            doctor,
            date
        });

        await newAppointment.save();
        res.status(201).json({ message: 'Cita médica creada exitosamente', newAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la cita', error: error.message });
    }
};

// Obtener todas las citas (Read)
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('patient', 'name email');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas', error: error.message });
    }
};

// Actualizar una cita (Update)
exports.updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const appointment = await Appointment.findByIdAndUpdate(id, updatedData, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }

        res.json({ message: 'Cita actualizada exitosamente', appointment });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la cita', error: error.message });
    }
};

// Eliminar una cita (Delete)
exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByIdAndDelete(id);
        
        if (!appointment) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }

        res.json({ message: 'Cita eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la cita', error: error.message });
    }
};