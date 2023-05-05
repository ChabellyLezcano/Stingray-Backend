const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  dni: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  direccion: {
    type: String,
    required: true
  },
  telefono_movil: {
    type: String,
    required: true
  },
  cp: {
    type: String,
    required: true
  },
  municipio: {
    type: String,
    required: true
  },
  provincia: {
    type: String,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;
