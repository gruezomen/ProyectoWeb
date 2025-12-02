const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verificarToken, soloAdmin } = require('../middleware/authmiddleware');

// Todas las rutas aquí requieren token y rol de administrador

// GET /api/admin/usuarios -> Obtener todos los usuarios
router.get(
    '/usuarios', 
    [verificarToken, soloAdmin], 
    adminController.obtenerUsuarios
);

// PATCH /api/admin/usuarios/:id/estado -> Cambiar el estado de un usuario
router.patch(
    '/usuarios/:id/estado',
    [verificarToken, soloAdmin],
    adminController.cambiarEstadoUsuario
);

module.exports = router;
