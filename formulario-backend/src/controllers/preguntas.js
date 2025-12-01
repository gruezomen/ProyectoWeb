const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const Pregunta = require('../models/pregunta');
const Subcategoria = require('../models/subcategoria');
const RangoEdad = require('../models/rangoEdad');
const NivelDificultad = require('../models/nivelDificultad');

// GET /api/preguntas
exports.obtenerPreguntas = async (req, res) => {
  try {
    const filtro = {};

    // filtros opcionales por querystring:
    // /api/preguntas?subcategoria=...&rango_edad=...&dificultad=...&tipo_pregunta=...&activa=true
    if (req.query.subcategoria) filtro.subcategoria = req.query.subcategoria;
    if (req.query.rango_edad) filtro.rango_edad = req.query.rango_edad;
    if (req.query.dificultad) filtro.dificultad = req.query.dificultad;
    if (req.query.tipo_pregunta) filtro.tipo_pregunta = req.query.tipo_pregunta;
    if (req.query.activa !== undefined) filtro.activa = req.query.activa === 'true';

    const preguntas = await Pregunta.find(filtro)
      .populate('subcategoria')
      .populate('rango_edad')
      .populate('dificultad');

    res.json(preguntas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/preguntas/:id
exports.obtenerPreguntaPorId = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'ID inválido' });

    const pregunta = await Pregunta.findById(req.params.id)
      .populate('subcategoria')
      .populate('rango_edad')
      .populate('dificultad');

    if (!pregunta) return res.status(404).json({ error: 'Pregunta no encontrada' });
    res.json(pregunta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/preguntas
exports.crearPregunta = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const nueva = await Pregunta.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/preguntas/:id
exports.actualizarPregunta = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const actualizada = await Pregunta.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!actualizada) return res.status(404).json({ error: 'Pregunta no encontrada' });
    res.json(actualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/preguntas/:id
exports.eliminarPregunta = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'ID inválido' });

    const eliminada = await Pregunta.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ error: 'Pregunta no encontrada' });

    res.json({ mensaje: 'Pregunta eliminada', id: eliminada._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};