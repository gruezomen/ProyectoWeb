const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/rangosEdad');

router.get('/', ctrl.obtenerRangos);
router.get('/:id', ctrl.obtenerRangoPorId);
router.post('/', ctrl.crearRango);
router.put('/:id', ctrl.actualizarRango);
router.delete('/:id', ctrl.eliminarRango);

module.exports = router;