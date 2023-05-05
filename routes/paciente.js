const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  crearPaciente,
  borrarPaciente,
  editarPaciente,
  verPaciente,
  listarPacientes,
} = require("../controllers/pacienteController");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
  "/crearPaciente",
  [
    validarJWT,
    check("nombre", "El nombre del paciente es obligatorio").not().isEmpty(),
    check("apellidos", "El apellido del paciente es obligatorio").not().isEmpty(),
    check("dni", "El DNI del paciente es obligatorio").not().isEmpty(),
    check("email", "El email del paciente es obligatorio").isEmail(),
    check("direccion", "La dirección del paciente es obligatoria")
     .notEmpty(),
    check("telefono_movil", "El teléfono móvil del paciente es obligatorio")
     .notEmpty(),
    check("cp", "El código postal del paciente es obligatorio")
     .notEmpty(),
    check("municipio", "El municipio del paciente es obligatorio")
     .notEmpty(),
    check("provincia", "La provincia del paciente es obligatoria")
     .notEmpty(),
    validarCampos,
  ],
  crearPaciente
);

router.delete("/borrarPaciente/:id", validarJWT, borrarPaciente);

router.put(
  "/editarPaciente/:id",
  [
    validarJWT,
    check("nombre", "El nombre del paciente es obligatorio").notEmpty(),
    check("apellidos", "El apellido del paciente es obligatorio").notEmpty(),
    check("dni", "El DNI del paciente es obligatorio").notEmpty(),
    check("email", "El email del paciente es obligatorio").isEmail(),
    check("direccion", "La dirección del paciente es obligatoria")
     .notEmpty(),
    check("telefono_movil", "El teléfono móvil del paciente es obligatorio")
      .notEmpty(),
    check("cp", "El código postal del paciente es obligatorio")
     .notEmpty(),
    check("municipio", "El municipio del paciente es obligatorio")
     .notEmpty(),
    check("provincia", "La provincia del paciente es obligatoria")
     .notEmpty(),
    validarCampos,
  ],
  editarPaciente
);

router.get("/verPaciente/:id", validarJWT, verPaciente);

router.get("/listarPacientes", validarJWT, listarPacientes);

module.exports = router;
