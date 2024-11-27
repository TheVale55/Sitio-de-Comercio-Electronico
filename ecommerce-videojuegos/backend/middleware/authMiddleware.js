const jwt = require('jsonwebtoken');

const protect = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
      const decoded = jwt.verify(token, 'ecommerce-videojuegos-TEC');
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'No tienes permisos para acceder' });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: 'Token inválido' });
    }
  };
};

module.exports = { protect };
