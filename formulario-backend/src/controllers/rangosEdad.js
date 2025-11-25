const RangoEdad = require('../models/rangoEdad');

exports.obtenerRangos = async (req, res) => {
  try {
    const rangos = await RangoEdad.find();
    res.json(rangos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerRangoPorId = async (req, res) => {
  try {
    const rango = await RangoEdad.findById(req.params.id);
    if (!rango) return res.status(404).json({ error: 'Rango no encontrado' });
    res.json(rango);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crearRango = async (req, res) => {
  try {
    const nuevo = await RangoEdad.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.actualizarRango = async (req, res) => {
  try {
    const rango = await RangoEdad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!rango) return res.status(404).json({ error: 'Rango no encontrado' });
    res.json(rango);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.eliminarRango = async (req, res) => {
  try {
    const rango = await RangoEdad.findByIdAndDelete(req.params.id);
    if (!rango) return res.status(404).json({ error: 'Rango no encontrado' });
    res.json({ mensaje: 'Rango eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};