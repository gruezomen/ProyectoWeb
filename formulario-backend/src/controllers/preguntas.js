const mongoose = require('mongoose');
const Pregunta = require('../models/pregunta');
const Subcategoria = require('../models/subcategoria');
const RangoEdad = require('../models/rangoEdad');
const NivelDificultad = require('../models/nivelDificultad');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const validarReferencias = async ({ subcategoria, rango_edad, dificultad }) => {
  if (!isValidId(subcategoria) || !isValidId(rango_edad) || !isValidId(dificultad)) {
    return { ok: false, error: 'IDs inválidos en subcategoria / rango_edad / dificultad' };
  }

  const [sub, rango, nivel] = await Promise.all([
    Subcategoria.findById(subcategoria),
    RangoEdad.findById(rango_edad),
    NivelDificultad.findById(dificultad),
  ]);

  if (!sub) return { ok: false, error: 'Subcategoría no encontrada' };
  if (!rango) return { ok: false, error: 'Rango de edad no encontrado' };
  if (!nivel) return { ok: false, error: 'Nivel de dificultad no encontrado' };

  return { ok: true };
};

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
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'ID inválido' });

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
  try {
    const { subcategoria, rango_edad, dificultad } = req.body;

    const valid = await validarReferencias({ subcategoria, rango_edad, dificultad });
    if (!valid.ok) return res.status(400).json({ error: valid.error });

    const nueva = await Pregunta.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/preguntas/:id
exports.actualizarPregunta = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'ID inválido' });

    // si mandan referencias, validarlas
    const { subcategoria, rango_edad, dificultad } = req.body;
    if (subcategoria || rango_edad || dificultad) {
      const valid = await validarReferencias({
        subcategoria: subcategoria ?? (await Pregunta.findById(req.params.id))?.subcategoria,
        rango_edad: rango_edad ?? (await Pregunta.findById(req.params.id))?.rango_edad,
        dificultad: dificultad ?? (await Pregunta.findById(req.params.id))?.dificultad,
      });
      if (!valid.ok) return res.status(400).json({ error: valid.error });
    }

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
    if (!isValidId(req.params.id)) return res.status(400).json({ error: 'ID inválido' });

    const eliminada = await Pregunta.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ error: 'Pregunta no encontrada' });

    res.json({ mensaje: 'Pregunta eliminada', id: eliminada._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};