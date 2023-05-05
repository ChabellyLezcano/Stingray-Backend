const { Schema, model } = require('mongoose');


const DoctorSchema = Schema({
    foto: {
        type: String,
        require: false 
      },
    cabecera: {
        type: String,
        require: true
      },
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    numColegiado: {
        type: String,
        required: true,
        unique: true
    }
    ,
    telefono_movil: {
        type: String,
        required: true
    }
    ,
    especialidad: {
        type: String,
        required: true
    }
    ,
    dni: {
        type: String,
        required: true, 
        unique: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
      }
});

module.exports = model('Doctor', DoctorSchema );