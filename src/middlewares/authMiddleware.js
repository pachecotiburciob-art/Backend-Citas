import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Buscar el token en el encabezado 'Authorization'
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(403).json({ mensaje: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    // El formato esperado es "Bearer <token>"
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(403).json({ mensaje: 'Token malformado o no encontrado.' });
    }

    // Verificar el token usando la misma clave secreta del controlador
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_super_seguro');
    
    // Guardar los datos decodificados del usuario (id, rol) en la petición
    req.usuario = decoded;
    
    next(); // Continuar con la siguiente función (el controlador)
  } catch (error) {
    console.error('Error al verificar token:', error);
    return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
  }
};