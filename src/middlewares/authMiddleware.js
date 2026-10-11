const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'secreto_super_seguro');
        req.user = verified; // Guardamos los datos del usuario decodificados en la petición
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido o expirado' });
    }
};

module.exports = verifyToken;