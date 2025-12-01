const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/categorias');
const { validateCategoria } = require('../validators/categorias');

router.get('/', ctrl.obtenerCategorias);
router.get('/:id', ctrl.obtenerCategoriaPorId);
router.post('/', validateCategoria, ctrl.crearCategoria);
router.put('/:id', validateCategoria, ctrl.actualizarCategoria);
router.delete('/:id', ctrl.eliminarCategoria);

module.exports = router;
