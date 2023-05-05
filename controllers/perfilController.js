const Perfil = require("../models/Perfil");


const crearPerfil = async (req, res) => {
    try {
      const {
        direccion,
        cp,
        nif,
        telefono_movil,
        telefono_fijo,
        municipio,
        provincia,
      } = req.body;
  
      const { uid } = req;
  
      // Buscar si ya existe un perfil para este usuario
      const perfilExistente = await Perfil.findOne({ usuario: uid });
  
      if (perfilExistente) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un perfil para este usuario",
        });
      }
  
      // Buscar si ya existe un perfil con este nif
      const nifExistente = await Perfil.findOne({ nif });
  
      if (nifExistente) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un perfil con este nif",
        });
      }
  
      // Crear una instancia del modelo Perfil
      const perfil = new Perfil({
        foto: req.file.filename,
        direccion,
        cp,
        nif,
        telefono_movil,
        telefono_fijo,
        municipio,
        provincia,
        usuario: uid,
      });
  
      // Guardar el perfil en MongoDB
      await perfil.save();
  
      // Devolver la respuesta al cliente
      res.json({
        ok: true,
        msg: "Perfil creado correctamente",
        perfil,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error al guardar el perfil en la base de datos",
      });
    }
  };
  
  
  
  const actualizarPerfil = async (req, res 
) => {
    const perfilId = req.params.id; // obtener el id del perfil a actualizar desde la URL
    const datosPerfil = req.body; // obtener los datos del perfil a actualizar desde el cuerpo de la petición
  
    try {
      // buscar y actualizar el perfil en la base de datos
      const perfilActualizado = await Perfil.findByIdAndUpdate(
        perfilId,
        datosPerfil,
        { new: true }
      );
  
      // verificar si se encontró el perfil
      if (!perfilActualizado) {
        return res.status(404).json({
          ok: false,
          msg: "Perfil no encontrado",
        });
      }
  
      // devolver una respuesta exitosa
      res.json({
        ok: true,
        msg: "Perfil actualizado correctamente",
        perfil: perfilActualizado,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error al actualizar el perfil",
      });
    }
  };
  
  const verPerfil = async (req, res 
) => {
    const perfilId = req.params.id; // obtener el id del perfil a buscar desde la URL
  
    try {
      // buscar el perfil en la base de datos
      const perfil = await Perfil.findById(perfilId);
  
      // verificar si se encontró el perfil
      if (!perfil) {
        return res.status(404).json({
          ok: false,
          msg: "Perfil no encontrado",
        });
      }
  
      // devolver una respuesta exitosa con el perfil encontrado
      res.json({
        ok: true,
        perfil,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error al buscar el perfil",
      });
    }
  };
  
  module.exports = {
    crearPerfil,
    actualizarPerfil,
    verPerfil,
  };
  