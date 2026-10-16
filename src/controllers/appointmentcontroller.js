const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
    try {
        const { doctor, date, reason, symptoms } = req.body;
        const patientId = req.user.id;

        const appointmentReason = reason || symptoms;

        if (!doctor || !date || !appointmentReason) {
            return res.status(400).json({ message: "Por favor, completa todos los campos de la cita." });
        }

        const newAppointment = new Appointment({
            patient: patientId,
            doctor,
            date,
            reason: appointmentReason,
            status: 'pending'
        });

        await newAppointment.save();
        res.status(201).json({ message: "Cita agendada con éxito", appointment: newAppointment });
    } catch (error) {
        console.error("Error al crear cita:", error);
        res.status(500).json({ message: "Error en el servidor al agendar la cita", error: error.message });
    }
};

const getAppointments = async (req, res) => {
    try {
        let filter = {};
        if (req.user.role === 'doctor') {
            filter.doctor = req.user.id;
        } else {
            filter.patient = req.user.id;
        }

        const appointments = await Appointment.find(filter)
            .populate('patient', 'name email')
            .populate('doctor', 'name email')
            .sort({ date: 1 });

        res.json(appointments);
    } catch (error) {
        console.error("Error al obtener citas:", error);
        res.status(500).json({ message: "Error al obtener las citas" });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['confirmed', 'pending'].includes(status)) {
            return res.status(400).json({ message: "Estado no válido" });
        }

        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }

        if (req.user.role === 'doctor' && appointment.doctor.toString() !== req.user.id) {
            return res.status(403).json({ message: "No tienes permiso para modificar esta cita" });
        }

        appointment.status = status;
        await appointment.save();

        res.json({ message: "Estado de cita actualizado exitosamente", appointment });
    } catch (error) {
        console.error("Error al actualizar estado:", error);
        res.status(500).json({ message: "Error al actualizar el estado de la cita" });
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    updateAppointmentStatus
};