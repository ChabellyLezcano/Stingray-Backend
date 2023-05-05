const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
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
    dia: {
      type: Date,
      required: true
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    paciente: {
      type: mongoose.Schema.Types.String,
      required: true
    }
  });
  
  citaSchema.pre('save', function(next) {
    const date = new Date(this.dia);
    this.dia = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    next();
  });
  
  const Cita = mongoose.model('Cita', citaSchema);  

module.exports = Cita;