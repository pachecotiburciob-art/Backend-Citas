import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['paciente', 'medico', 'admin'],
    default: 'paciente'
  }
}, {
  timestamps: true // Esto agrega automáticamente campos de fecha de creación y actualización
});

const User = mongoose.model('User', userSchema);

export default User;