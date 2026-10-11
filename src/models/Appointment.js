const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Pendiente', 'Confirmada', 'Cancelada'], default: 'Pendiente' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);