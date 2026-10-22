const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Acceso denegado. Se requieren privilegios de Administrador." });
    }
};

module.exports = adminMiddleware;