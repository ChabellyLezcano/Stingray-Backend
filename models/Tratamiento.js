const mongoose = require('mongoose');

const tratamientoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  codigo: {
    type: Number,
    unique: true
  },
  precio: {
    type: Number,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  pieza: {
    type: String,
    required: false,
    default: null
  },
  numero: {
    type: Number,
    required: false,
    default: null
  }
});

tratamientoSchema.pre('save', async function (next) {
  try {
    if (this.isNew || this.isModified('codigo')) {
      // Get the highest codigo value currently in the collection
      const highestCodigo = await this.constructor.findOne().sort('-codigo').exec();
      const nextCodigo = (highestCodigo ? highestCodigo.codigo : 0) + 1;
      this.codigo = nextCodigo;
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Tratamiento = mongoose.model('Tratamiento', tratamientoSchema);

module.exports = Tratamiento;
