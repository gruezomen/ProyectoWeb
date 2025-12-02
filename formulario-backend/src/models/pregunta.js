const mongoose = require('mongoose');

const opcionSchema = new mongoose.Schema(
  {
    texto_opcion: { type: String, required: true, trim: true },
    es_correcta: { type: Boolean, default: false },
    orden: { type: Number, default: 0 },
  },
  { _id: false }
);

const parEmparejamientoSchema = new mongoose.Schema(
  {
    texto_pregunta: { type: String, required: true, trim: true },
    texto_respuesta: { type: String, required: true, trim: true },
    orden: { type: Number, default: 0 },
  },
  { _id: false }
);

const preguntaSchema = new mongoose.Schema(
  {
    // Relaciones (basado en tu ER)
    subcategoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategoria',
      required: true,
    },
    rango_edad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RangoEdad',
      required: true,
    },
    dificultad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NivelDificultad',
      required: true,
    },

    // Campos principales (tu ER)
    tipo_pregunta: {
      type: String,
      required: true,
      trim: true,
      // ejemplos: "opcion_multiple", "verdadero_falso", "desarrollo", "emparejamiento"
    },
    titulo_pregunta: { type: String, required: true, trim: true },
    explicacion: { type: String, trim: true },

    puntos_recomendados: { type: Number, default: 1 },
    tiempo_estimado: { type: Number, default: 0 },

    // Estructuras ligadas al tipo (ER: opciones_pregunta, pares_emparejamiento)
    opciones: { type: [opcionSchema], default: [] },
    pares_emparejamiento: { type: [parEmparejamientoSchema], default: [] },

    activa: { type: Boolean, default: true },

    estado: {
      type: String,
      enum: ['pendiente', 'aprobada', 'rechazada'],
      default: 'aprobada',
    },

    votos_positivos: { type: Number, default: 0 },
    votos_negativos: { type: Number, default: 0 },
  },
  { timestamps: true, collection: 'preguntas' }
);

module.exports = mongoose.model('Pregunta', preguntaSchema);