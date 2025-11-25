const mongoose = require('mongoose');

const subcategoriaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, trim: true },
    categoria: {               // referencia a Categoria
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria',
      required: true,
    },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'subcategorias' }
);

module.exports = mongoose.model('Subcategoria', subcategoriaSchema);