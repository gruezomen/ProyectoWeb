const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/preguntas');

router.get('/', ctrl.obtenerPreguntas);
router.get('/:id', ctrl.obtenerPreguntaPorId);
router.post('/', ctrl.crearPregunta);
router.put('/:id', ctrl.actualizarPregunta);
router.delete('/:id', ctrl.eliminarPregunta);

module.exports = router;