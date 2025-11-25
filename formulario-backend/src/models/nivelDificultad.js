const mongoose = require('mongoose');

const nivelDificultadSchema = new mongoose.Schema(
  {
    nivel: { type: String, required: true, trim: true }, // Fácil, Medio, Difícil…
    descripcion: { type: String, trim: true },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'niveles_dificultad' }
);

module.exports = mongoose.model('NivelDificultad', nivelDificultadSchema);