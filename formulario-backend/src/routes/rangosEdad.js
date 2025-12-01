const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/rangosEdad');
const { validateRangoEdad } = require('../validators/rangosEdad');

router.get('/', ctrl.obtenerRangos);
router.get('/:id', ctrl.obtenerRangoPorId);
router.post('/', validateRangoEdad, ctrl.crearRango);
router.put('/:id', validateRangoEdad, ctrl.actualizarRango);
router.delete('/:id', ctrl.eliminarRango);

module.exports = router;