const Usuario = require('../models/usuario');

// Listar todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    // Excluimos el password de la respuesta por seguridad
    const usuarios = await Usuario.find().select('-password');
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error al obtener los usuarios');
  }
};

// Cambiar el estado de un usuario
exports.cambiarEstadoUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    // Validar que el estado sea uno de los permitidos por el Schema
    const estadosPermitidos = Usuario.schema.path('estado').enumValues;
    if (!estadosPermitidos.includes(estado)) {
      return res.status(400).json({ error: 'Estado no válido.' });
    }

    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { estado },
      { new: true } // Devuelve el documento actualizado
    ).select('-password');

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    res.json({ mensaje: 'Estado del usuario actualizado correctamente.', usuario });
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error al actualizar el estado del usuario.');
  }
};
