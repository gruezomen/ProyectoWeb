const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, trim: true },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'categorias' }
);

module.exports = mongoose.model('Categoria', categoriaSchema);