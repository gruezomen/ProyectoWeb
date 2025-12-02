const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/preguntas');
const { validatePregunta } = require('../validators/preguntas');
const { verificarToken, soloEditor } = require('../middleware/authmiddleware');

// Rutas públicas
router.get('/', ctrl.obtenerPreguntas);
router.get('/:id', ctrl.obtenerPreguntaPorId);

// Rutas protegidas (ELIMINA las antiguas, deja solo estas)
router.post('/', verificarToken, soloEditor, validatePregunta, ctrl.crearPregunta);
router.put('/:id', verificarToken, soloEditor, validatePregunta, ctrl.actualizarPregunta);
router.delete('/:id', verificarToken, soloEditor, ctrl.eliminarPregunta);

module.exports = router;