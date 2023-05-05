const mongoose = require('mongoose');

const perfilSchema = new mongoose.Schema({
  foto: { type: String },
  direccion: { type: String, required: true },
  telefono_movil: { type: String, required: true },
  telefono_fijo: { type: String },
  cp: { type: String, required: true },
  municipio: { type: String, required: true },
  provincia: { type: String, required: true },
  nif: { type: String, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

const Perfil = mongoose.model('Perfil', perfilSchema);

module.exports = Perfil;