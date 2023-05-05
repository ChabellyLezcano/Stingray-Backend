const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  fecha: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
});

const Evento = mongoose.model('Evento', eventoSchema);

module.exports = Evento;