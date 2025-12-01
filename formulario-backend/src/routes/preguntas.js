const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/preguntas');
const { validatePregunta } = require('../validators/preguntas');

router.get('/', ctrl.obtenerPreguntas);
router.get('/:id', ctrl.obtenerPreguntaPorId);
router.post('/', validatePregunta, ctrl.crearPregunta);
router.put('/:id', validatePregunta, ctrl.actualizarPregunta);
router.delete('/:id', ctrl.eliminarPregunta);

module.exports = router;