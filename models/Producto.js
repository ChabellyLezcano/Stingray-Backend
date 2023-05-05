const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  categoria: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  marca: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  unidades: {
    type: Number,
    required: true,
    min: 0,
  },
  foto: {
    type: String,
    require: false 
  },
  codigo: {
    type: Number,
    unique: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario', // Referencia a la entidad Usuario
  },
});

productoSchema.pre('save', async function (next) {
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

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;