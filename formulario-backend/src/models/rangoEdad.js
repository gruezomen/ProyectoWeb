const mongoose = require('mongoose');

const rangoEdadSchema = new mongoose.Schema(
  {
    nombre_rango: { type: String, required: true, trim: true }, // Niños, Adolescentes…
    edad_minima: { type: Number, required: true },
    edad_maxima: { type: Number, required: true },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'rangos_edad' }
);

module.exports = mongoose.model('RangoEdad', rangoEdadSchema);