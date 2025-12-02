const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Crear token
const generarToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// REGISTRO
exports.registro = async (req, res) => {
  try {
    const { nombre, apellido, email, password, rol } = req.body;

    // Verificar si ya existe
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ error: 'El email ya existe' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear usuario
    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      email,
      password: passwordHash,
      rol: rol || 'estudiante'
    });

    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente. Su cuenta está pendiente de aprobación por un administrador.',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    // Verificar estado del usuario
    if (usuario.estado === 'pendiente') {
      return res.status(403).json({ error: 'Su cuenta está pendiente de aprobación.' });
    }
    if (usuario.estado === 'rechazado') {
      return res.status(403).json({ error: 'Su cuenta ha sido rechazada. Contacte al administrador.' });
    }

    // Verificar contraseña
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    // Crear token
    const token = generarToken(usuario._id);

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al hacer login' });
  }
};

// VER PERFIL
exports.perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.userId).select('-password');
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};