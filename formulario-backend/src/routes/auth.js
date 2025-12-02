const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verificarToken } = require('../middleware/authmiddleware');

// Rutas SIN token (públicas)
router.post('/registro', authController.registro);
router.post('/login', authController.login);

// Rutas CON token (protegidas)
router.get('/perfil', verificarToken, authController.perfil);

module.exports = router;
