const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/subcategorias');
const { validateSubcategoria } = require('../validators/subcategorias');

router.get('/', ctrl.obtenerSubcategorias);
router.get('/:id', ctrl.obtenerSubcategoriaPorId);
router.post('/', validateSubcategoria, ctrl.crearSubcategoria);
router.put('/:id', validateSubcategoria, ctrl.actualizarSubcategoria);
router.delete('/:id', ctrl.eliminarSubcategoria);

module.exports = router;