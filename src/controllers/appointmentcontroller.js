import Appointment from '../models/Appointment.js';

// Obtener todas las citas (o filtradas por el usuario logueado)
export const obtenerCitas = async (req, res) => {
  try {
    // Si es paciente, podemos filtrar para que solo vea sus citas, o ver todas si es admin/médico
    let filtro = {};
    if (req.usuario && req.usuario.rol === 'paciente') {
      filtro = { paciente: req.usuario.id };
    }

    const citas = await Appointment.find(filtro).populate('paciente', 'nombre email');
    res.json(citas);
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ mensaje: 'Hubo un error en el servidor al obtener las citas' });
  }
};

// Crear una nueva cita
export const crearCita = async (req, res) => {
  try {
    const { medico, fecha, motivo } = req.body;

    const nuevaCita = new Appointment({
      paciente: req.usuario.id, // Viene del token JWT verificado por el middleware
      medico,
      fecha,
      motivo
    });

    const citaGuardada = await nuevaCita.save();
    res.status(201).json({
      mensaje: 'Cita creada exitosamente',
      cita: citaGuardada
    });
  } catch (error) {
    console.error('Error al crear cita:', error);
    res.status(500).json({ mensaje: 'Hubo un error en el servidor al crear la cita' });
  }
};

// Actualizar el estado o detalles de una cita
export const actualizarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const citaActualizada = await Appointment.findByIdAndUpdate(id, datosActualizados, { new: true });

    if (!citaActualizada) {
      return res.status(404).json({ mensaje: 'Cita no encontrada' });
    }

    res.json({
      mensaje: 'Cita actualizada exitosamente',
      cita: citaActualizada
    });
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    res.status(500).json({ mensaje: 'Hubo un error en el servidor al actualizar la cita' });
  }
};

// Eliminar o cancelar una cita
export const eliminarCita = async (req, res) => {
  try {
    const { id } = req.params;

    const citaEliminada = await Appointment.findByIdAndDelete(id);

    if (!citaEliminada) {
      return res.status(404).json({ mensaje: 'Cita no encontrada' });
    }

    res.json({ mensaje: 'Cita eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    res.status(500).json({ mensaje: 'Hubo un error en el servidor al eliminar la cita' });
  }
};