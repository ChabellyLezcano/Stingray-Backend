const Evento = require('../models/Evento');

// Create a new event
const crearEvento = async (req, res = response) => {
    try {
      const { titulo, descripcion, hora, fecha } = req.body;
  
      const { uid } = req;
    const usuario =  uid;


      // create a new instance of a evento
      const evento = new Evento({
        titulo, descripcion, hora, fecha, usuario
      });

  
    const eventoCoincidente = await Evento.findOne({ hora, fecha });

    if ( eventoCoincidente ) {
        return res.status(400).json({
            ok: false,
            msg: 'Ya tiene un evento a esa hora'
        });
    } 
  
      // save the evento to the database
      await evento.save();
  
      // send the Doctor object as a response
      res.status(201).json({
        ok: true,
        msg: "Evento creado exitosamente",
        evento
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Error al crear evento",
      });
    }
  };

// Delete an event
const borrarEvento = async (req, res) => {
    try {
        const eventoEliminado = await Evento.deleteOne({_id: req.params.id});
  
      if (!eventoEliminado) {
        return res.status(404).json({
          ok: false,
          msg: 'Evento no encontrado'
        });
      }
  
      res.status(200).json({
        ok: true,
        msg: 'Evento borrado exitosamente'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error al borrar evento'
      });
    }
  };

// View a specific event
const verEvento = async (req, res) => {
    try {
      const evento = await Evento.findById(req.params.id);
      if (!evento) {
        return res.status(404).json({
          ok: false,
          msg: 'Evento no encontrado'
        });
      }
      res.status(200).json({
        ok: true,
        evento
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error al obtener evento'
      });
    }
  };

  // Edit an event
const editarEvento = async (req, res) => {
    try {
      const { fecha, titulo, descripcion, hora } = req.body;
  
      const evento = await Evento.findById(req.params.id);
  
      if (!evento) {
        return res.status(404).json({
          ok: false,
          msg: 'Evento no encontrado'
        });
      }
  
      if (evento.usuario.toString() !== req.uid) {
        return res.status(401).json({
          ok: false,
          msg: 'No tiene permiso para editar este evento'
        });
      }
  
      evento.fecha = fecha;
      evento.titulo = titulo;
      evento.descripcion = descripcion;
      evento.hora = hora;
  
      await evento.save();
  
      res.status(200).json({
        ok: true,
        msg: 'Evento actualizado exitosamente',
        evento
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error al actualizar evento'
      });
    }
  };

  // List all events for a specific user
const listarEventos = async (req, res) => {
    try {
      const eventos = await Evento.find({ usuario: req.uid });
  
      res.status(200).json({
        ok: true,
        eventos
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error al obtener eventos'
      });
    }
  };
  

  module.exports = {
    crearEvento,
    borrarEvento,
    verEvento,
    editarEvento,
    listarEventos
  };