const Doctor = require("../models/Doctor");


const crearDoctor = async (req, res = response) => {
    try {
      const { foto, cabecera, nombre, apellidos, email, numColegiado, telefono_movil, especialidad, dni } = req.body;
  
      const { uid } = req;
    const usuario =  uid;

      // create a new instance of a Doctor
      const doctor = new Doctor({
        foto: req.file.filename,
        cabecera,
        nombre,
        apellidos,
        email,
        numColegiado,
        telefono_movil,
        especialidad,
        dni,
        usuario
      });

      const doctorExistenteDNI = await Doctor.findOne({ dni });

    if ( doctorExistenteDNI ) {
        return res.status(400).json({
            ok: false,
            msg: 'El doctor ya existe con ese dni'
        });
    } 
  
    const doctorExistenteNumColegiado = await Doctor.findOne({ numColegiado });

    if ( doctorExistenteNumColegiado ) {
        return res.status(400).json({
            ok: false,
            msg: 'El doctor ya existe con ese número de colegiado'
        });
    } 
  
      // save the Doctor to the database
      await doctor.save();
  
      // send the Doctor object as a response
      res.status(201).json({
        ok: true,
        msg: "Doctor creado exitosamente",
        doctor
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Error al crear doctor",
      });
    }
  };
  

  const borrarDoctor = async (req, res = response) => {
    try {
      const idDoctor = req.params.id;
  
      // find the Doctor by numColegiado and remove it from the database
      const doctor = await Doctor.deleteOne({ _id: idDoctor});
  
      if (!doctor) {
        return res.status(404).json({
          msg: "Doctor no encontrado",
        });
      }
  
      // send a success message as a response
      res.json({
        msg: "Doctor eliminado correctamente",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Error al eliminar doctor",
      });
    }
  };
  
  const actualizarDoctor = async (req, res = response) => {
    const { id } = req.params;
    const { nombre, apellidos, email, numColegiado, telefono_movil, especialidad, foto } = req.body;
  
    try {
      const doctor = await Doctor.findOneAndUpdate(
        { _id: id },
        { nombre, apellidos, email, numColegiado, telefono_movil, especialidad, foto },
        { new: true }
      );
  
      if (!doctor) {
        return res.status(404).json({
          ok: false,
          msg: 'Doctor no encontrado'
        });
      }
  
      res.json({
        ok: true,
        doctor
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Contacte con el administrador'
      });
    }
  };
  
  
  const verDoctor = async (req, res = response) => {
    const id = req.params.id;
  
    try {
      const doctores = await Doctor.findById(id);
  
      if (!doctores) {
        return res.status(404).json({
          ok: false,
          msg: "Doctor no encontrado",
        });
      }
  
      res.json({
        ok: true,
        doctores,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Contacte con el administrador",
      });
    }
  };
  
  
  const listarDoctores = async (req, res = response) => {
    const { uid } = req;

    try {
      const doctores = await Doctor.find({usuario: uid});
      res.status(200).json({
        ok: true,
        doctores
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al listar los doctores'
      });
    }
  };
  
  module.exports = {
    crearDoctor,
    borrarDoctor,
    actualizarDoctor,
    verDoctor,
    listarDoctores
  };
  