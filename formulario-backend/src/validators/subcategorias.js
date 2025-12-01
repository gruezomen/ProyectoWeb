const { body } = require('express-validator');
const mongoose = require('mongoose');

exports.validateSubcategoria = [
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
  body('categoria')
    .notEmpty()
    .withMessage('La categoría es obligatoria.')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('El ID de la categoría no es válido.'),
];
