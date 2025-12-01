const { body } = require('express-validator');

exports.validateRangoEdad = [
  body('nombre_rango')
    .trim()
    .notEmpty()
    .withMessage('El nombre del rango es obligatorio.')
    .isString()
    .withMessage('El nombre del rango debe ser una cadena de texto.'),
  body('edad_minima')
    .notEmpty()
    .withMessage('La edad mínima es obligatoria.')
    .isNumeric()
    .withMessage('La edad mínima debe ser un número.')
    .custom((value, { req }) => {
      if (value >= req.body.edad_maxima) {
        throw new Error('La edad mínima debe ser menor que la edad máxima.');
      }
      return true;
    }),
  body('edad_maxima')
    .notEmpty()
    .withMessage('La edad máxima es obligatoria.')
    .isNumeric()
    .withMessage('La edad máxima debe ser un número.'),
];
