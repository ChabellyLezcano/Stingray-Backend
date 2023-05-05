const Cita = require('../models/Cita');

// Create a new cita
const crearCita = async (req, res = response) => {
    try {
      const { titulo, descripcion, hora, dia, doctor, paciente } = req.body;
  
      const { uid } = req;
      const usuario = uid;

      // create a new instance of a cita
      const cita = new Cita({
        titulo, descripcion, hora, dia, usuario, doctor, paciente
      });

      const citaCoincidente = await Cita.findOne({ hora, dia });

      if (citaCoincidente) {
        return res.status(400).json({
            ok: false,
            msg: 'Ya tiene una cita a esa hora'
        });
      } 
  
      // save the cita to the database
      await cita.save();
  
      // send the Cita object as a response
      res.status(201).json({
        ok: true,
        msg: "Cita creada exitosamente",
        cita
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Error al crear cita",
      });
    }
  };

// Delete a cita
const borrarCita = async (req, res) => {
    try {
        const citaEliminada = await Cita.deleteOne({_id: req.params.id});
  
      if (!citaEliminada) {
        return res.status(404).json({
          ok: false,
          msg: 'Cita no encontrada'
        });
      }
  
      res.status(200).json({
        ok: true,
        msg: 'Cita borrada exitosamente'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error al borrar cita'
      });
    }
  };

// View a specific cita
const verCita = async (req, res) => {
    try {
      const cita = await Cita.findById(req.params.id);
      if (!cita) {
        return res.status(404).json({
          ok: false,
          msg: 'Cita no encontrada'
        });
      }
      res.status(200).json({
        ok: true,
        cita
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error al obtener cita'
      });
    }
  };

  // Update a cita
const editarCita = async (req, res) => {
    try {
      const { titulo, descripcion, hora, dia, doctor, paciente } = req.body;
      const cita = await Cita.findById(req.params.id);
      if (!cita) {
        return res.status(404).json({
          ok: false,
          msg: 'Cita no encontrada'
        });
      }
      cita.titulo = titulo;
      cita.descripcion = descripcion;
      cita.hora = hora;
      cita.dia = dia;
      cita.doctor = doctor;
      cita.paciente = paciente;
      await cita.save();
      res.status(200).json({
        ok: true,
        msg: 'Cita actualizada exitosamente',
        cita
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error al actualizar cita'
      });
    }
  };

  // Get all citas
const listarCitas = async (req, res) => {
    try {
      const citas = await Cita.find({});
      res.status(200).json({
        ok: true,
        citas
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error al obtener citas'
      });
    }
  };

  
  module.exports= {
    crearCita,
    borrarCita,
    verCita,
    editarCita,
    listarCitas
  }
  