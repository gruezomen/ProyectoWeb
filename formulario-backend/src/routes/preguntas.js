const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/preguntas');
const { validatePregunta } = require('../validators/preguntas');
const { verificarToken, soloProfesor } = require('../middleware/authmiddleware');

// Rutas públicas
router.get('/', ctrl.obtenerPreguntas);
router.get('/:id', ctrl.obtenerPreguntaPorId);

// Rutas protegidas (ELIMINA las antiguas, deja solo estas)
router.post('/', verificarToken, soloProfesor, validatePregunta, ctrl.crearPregunta);
router.put('/:id', verificarToken, soloProfesor, validatePregunta, ctrl.actualizarPregunta);
router.delete('/:id', verificarToken, soloProfesor, ctrl.eliminarPregunta);

module.exports = router;