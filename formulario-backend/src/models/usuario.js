const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'profesor', 'estudiante'], 
    default: 'estudiante'
  }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
