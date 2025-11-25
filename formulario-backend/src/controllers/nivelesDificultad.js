const NivelDificultad = require('../models/nivelDificultad');

exports.obtenerNiveles = async (req, res) => {
  try {
    const niveles = await NivelDificultad.find();
    res.json(niveles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerNivelPorId = async (req, res) => {
  try {
    const nivel = await NivelDificultad.findById(req.params.id);
    if (!nivel) return res.status(404).json({ error: 'Nivel no encontrado' });
    res.json(nivel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crearNivel = async (req, res) => {
  try {
    const nuevo = await NivelDificultad.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.actualizarNivel = async (req, res) => {
  try {
    const nivel = await NivelDificultad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!nivel) return res.status(404).json({ error: 'Nivel no encontrado' });
    res.json(nivel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.eliminarNivel = async (req, res) => {
  try {
    const nivel = await NivelDificultad.findByIdAndDelete(req.params.id);
    if (!nivel) return res.status(404).json({ error: 'Nivel no encontrado' });
    res.json({ mensaje: 'Nivel eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};