const Subcategoria = require('../models/subcategoria');
const { validationResult } = require('express-validator');

exports.obtenerSubcategorias = async (req, res) => {
  try {
    const subcategorias = await Subcategoria
      .find()
      .populate('categoria', 'nombre');
    res.json(subcategorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerSubcategoriaPorId = async (req, res) => {
  try {
    const subcategoria = await Subcategoria
      .findById(req.params.id)
      .populate('categoria', 'nombre');
    if (!subcategoria) return res.status(404).json({ error: 'Subcategoría no encontrada' });
    res.json(subcategoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crearSubcategoria = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const nueva = await Subcategoria.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.actualizarSubcategoria = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const subcategoria = await Subcategoria.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!subcategoria) return res.status(404).json({ error: 'Subcategoría no encontrada' });
    res.json(subcategoria);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.eliminarSubcategoria = async (req, res) => {
  try {
    const subcategoria = await Subcategoria.findByIdAndDelete(req.params.id);
    if (!subcategoria) return res.status(404).json({ error: 'Subcategoría no encontrada' });
    res.json({ mensaje: 'Subcategoría eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};