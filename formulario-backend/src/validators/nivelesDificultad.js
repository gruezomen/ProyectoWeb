const { body } = require('express-validator');

exports.validateNivelDificultad = [
  body('nivel')
    .trim()
    .notEmpty()
    .withMessage('El nivel es obligatorio.')
    .isString()
    .withMessage('El nivel debe ser una cadena de texto.'),
  body('descripcion')
    .optional()
    .trim()
    .isString()
    .withMessage('La descripción debe ser una cadena de texto.'),
];
