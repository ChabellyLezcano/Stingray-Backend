const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  crearCita,
  borrarCita,
  verCita,
  editarCita,
  listarCitas,
} = require("../controllers/citaController");
const router = Router();

// Create a new cita
router.post(
    "/crearCita",
    [
      validarJWT,
      check("titulo", "El título es obligatorio").not().isEmpty(),
      check("descripcion", "La descripción es obligatoria").not().isEmpty(),
      check("hora", "La hora es obligatoria").not().isEmpty(),
      check("dia", "El día es obligatorio").not().isEmpty(),
      check("doctor", "El nombre del doctor es obligatorio").not().isEmpty(),
      check("paciente", "El nombre del paciente es obligatorio").not().isEmpty(),
      validarCampos,
    ],
    crearCita
  );
  
  // Delete a cita
  router.delete("/borrarCita/:id", [validarJWT], borrarCita);
  
  // View a specific cita
  router.get("/verCita/:id", [validarJWT], verCita);
  
  // Update a cita
  router.put(
    "/editarCita/:id",
    [
      validarJWT,
      check("titulo", "El título es obligatorio").not().isEmpty(),
      check("descripcion", "La descripción es obligatoria").not().isEmpty(),
      check("hora", "La hora es obligatoria").not().isEmpty(),
      check("dia", "El día es obligatorio").not().isEmpty(),
      check("doctor", "El nombre del doctor es obligatorio").not().isEmpty(),
      check("paciente", "El nombre del paciente es obligatorio").not().isEmpty(),
      validarCampos,
    ],
    editarCita
  );
  
  // Get all citas
  router.get("/listarCitas", [validarJWT], listarCitas);
  
  module.exports = router;