const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/nivelesDificultad');
const { validateNivelDificultad } = require('../validators/nivelesDificultad');

router.get('/', ctrl.obtenerNiveles);
router.get('/:id', ctrl.obtenerNivelPorId);
router.post('/', validateNivelDificultad, ctrl.crearNivel);
router.put('/:id', validateNivelDificultad, ctrl.actualizarNivel);
router.delete('/:id', ctrl.eliminarNivel);

module.exports = router;