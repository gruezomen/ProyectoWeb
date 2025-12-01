const { body } = require('express-validator');

exports.validateCategoria = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto.'),
  body('descripcion')
    .optional()
    .trim()
    .isString()
    .withMessage('La descripción debe ser una cadena de texto.'),
];
