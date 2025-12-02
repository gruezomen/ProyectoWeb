const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

// Verificar si el usuario tiene token válido
exports.verificarToken = async (req, res, next) => {
  try {
    // Obtener el token del header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No hay token' });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar el usuario
    const usuario = await Usuario.findById(decoded.id).select('-password');
    
    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Guardar usuario en la request
    req.usuario = usuario;
    req.userId = usuario._id;
    req.rol = usuario.rol;
    
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Solo profesores pueden pasar
exports.soloProfesor = (req, res, next) => {
  if (req.rol !== 'profesor' && req.rol !== 'administrador') {
    return res.status(403).json({ error: 'Solo profesores' });
  }
  next();
};

// Solo administradores pueden pasar
exports.soloAdmin = (req, res, next) => {
  if (req.rol !== 'administrador') {
    return res.status(403).json({ error: 'Solo administradores' });
  }
  next();
};