const { body } = require('express-validator');
const mongoose = require('mongoose');

exports.validatePregunta = [
  // Relaciones
  body('subcategoria')
    .notEmpty().withMessage('La subcategoría es obligatoria.')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('El ID de la subcategoría no es válido.'),
  body('rango_edad')
    .notEmpty().withMessage('El rango de edad es obligatorio.')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('El ID del rango de edad no es válido.'),
  body('dificultad')
    .notEmpty().withMessage('El nivel de dificultad es obligatorio.')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('El ID del nivel de dificultad no es válido.'),

  // Campos principales
  body('tipo_pregunta')
    .trim()
    .notEmpty().withMessage('El tipo de pregunta es obligatorio.')
    .isIn(['opcion_multiple', 'verdadero_falso', 'desarrollo', 'emparejamiento'])
    .withMessage('Tipo de pregunta no válido.'),
  body('titulo_pregunta')
    .trim()
    .notEmpty().withMessage('El título de la pregunta es obligatorio.'),
  body('explicacion').optional().trim(),
  body('puntos_recomendados').optional().isNumeric().withMessage('Los puntos deben ser un número.'),
  body('tiempo_estimado').optional().isNumeric().withMessage('El tiempo estimado debe ser un número.'),

  // Validación condicional para opciones
  body('opciones')
    .if(body('tipo_pregunta').equals('opcion_multiple'))
    .isArray({ min: 2 }).withMessage('Debe haber al menos dos opciones.'),
  body('opciones.*.texto_opcion')
    .if(body('tipo_pregunta').equals('opcion_multiple'))
    .notEmpty().withMessage('El texto de la opción no puede estar vacío.'),
  // Asegurarse de que al menos una opción sea correcta
  body('opciones')
    .if(body('tipo_pregunta').equals('opcion_multiple'))
    .custom(opciones => {
      const unaCorrecta = opciones.some(op => op.es_correcta === true);
      if (!unaCorrecta) {
        throw new Error('Al menos una opción debe ser marcada como correcta.');
      }
      return true;
    }),


  // Validación condicional para pares de emparejamiento
  body('pares_emparejamiento')
    .if(body('tipo_pregunta').equals('emparejamiento'))
    .isArray({ min: 1 }).withMessage('Debe haber al menos un par de emparejamiento.'),
  body('pares_emparejamiento.*.texto_pregunta')
    .if(body('tipo_pregunta').equals('emparejamiento'))
    .notEmpty().withMessage('El texto de la pregunta del par no puede estar vacío.'),
  body('pares_emparejamiento.*.texto_respuesta')
    .if(body('tipo_pregunta').equals('emparejamiento'))
    .notEmpty().withMessage('El texto de la respuesta del par no puede estar vacío.'),
];