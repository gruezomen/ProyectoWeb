const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/nivelesDificultad');

router.get('/', ctrl.obtenerNiveles);
router.get('/:id', ctrl.obtenerNivelPorId);
router.post('/', ctrl.crearNivel);
router.put('/:id', ctrl.actualizarNivel);
router.delete('/:id', ctrl.eliminarNivel);

module.exports = router;