const Paciente = require("../models/Paciente");

const crearPaciente = async (req, res) => {
  try {
    const {
      nombre,
      apellidos,
      dni,
      email,
      direccion,
      telefono_movil,
      cp,
      municipio,
      provincia,
    } = req.body;
    const { uid } = req;
    const usuario = uid;

    const existePaciente = await Paciente.findOne({ dni });
    if (existePaciente) {
      return res
        .status(400)
        .json({ message: "Ya existe un paciente con ese DNI" });
    }

    const paciente = new Paciente({
      nombre,
      apellidos,
      dni,
      email,
      direccion,
      telefono_movil,
      cp,
      municipio,
      provincia,
      usuario,
    });

    await paciente.save();
    res.status(201).json({ paciente, msg: "Paciente creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el paciente" });
  }
};


//Borrar Paciente
const borrarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const paciente = await Paciente.findByIdAndDelete(id);
    if (!paciente) {
      return res.status(404).json({ message: "No se encontró el paciente" });
    }
    res.json({ msg: "Paciente eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el paciente" });
  }
};


//Editar Paciente
const editarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      apellidos,
      dni,
      email,
      direccion,
      telefono_movil,
      cp,
      municipio,
      provincia,
    } = req.body;
    const paciente = await Paciente.findByIdAndUpdate(
      id,
      {
        nombre,
        apellidos,
        dni,
        email,
        direccion,
        telefono_movil,
        cp,
        municipio,
        provincia,
      },
      { new: true }
    );
    if (!paciente) {
      return res.status(404).json({ message: "No se encontró el paciente" });
    }
    res.json({ paciente, msg: "Paciente actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el paciente" });
  }
};


//Ver Paciente
const verPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);
    if (!paciente) {
      return res.status(404).json({ message: "No se encontró el paciente" });
    }
    res.json({ paciente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el paciente" });
  }
};

//Listar Paciente
const listarPacientes = async (req, res) => {
  try {
    const { uid } = req;
    const pacientes = await Paciente.find({usuario: uid});
    res.json({ pacientes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los pacientes" });
  }
};



module.exports = {
  crearPaciente,
  borrarPaciente,
  editarPaciente,
  verPaciente,
  listarPacientes,
};
