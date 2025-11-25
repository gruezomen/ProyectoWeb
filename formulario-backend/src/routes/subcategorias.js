const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/subcategorias');

router.get('/', ctrl.obtenerSubcategorias);
router.get('/:id', ctrl.obtenerSubcategoriaPorId);
router.post('/', ctrl.crearSubcategoria);
router.put('/:id', ctrl.actualizarSubcategoria);
router.delete('/:id', ctrl.eliminarSubcategoria);

module.exports = router;