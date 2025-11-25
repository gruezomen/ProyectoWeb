const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/categorias');

router.get('/', ctrl.obtenerCategorias);
router.get('/:id', ctrl.obtenerCategoriaPorId);
router.post('/', ctrl.crearCategoria);
router.put('/:id', ctrl.actualizarCategoria);
router.delete('/:id', ctrl.eliminarCategoria);

module.exports = router;
