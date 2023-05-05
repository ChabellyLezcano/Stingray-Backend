const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  crearDoctor,
  borrarDoctor,
  actualizarDoctor,
  verDoctor,
  listarDoctores,
} = require("../controllers/doctorController");
const { validarJWT } = require("../middlewares/validar-jwt");
const { upload } = require("../middlewares/upload");

const router = Router();

router.post(
  "/crearDoctor",
  upload.single("foto"),
  [
    validarJWT,
    check("cabecera", "La cabecera del doctor es obligatoria").notEmpty(),
    check("nombre", "El nombre del doctor es obligatorio").notEmpty(),
    check("apellidos", "Los apellidos del doctor son obligatorios").notEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("numColegiado", "El número de colegiado es obligatorio").notEmpty(),
    check("telefono_movil", "El teléfono móvil es obligatorio").notEmpty(),
    check("especialidad", "La especialidad es obligatoria").notEmpty(),
    check("dni", "El DNI es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearDoctor
);

router.delete("/borrarDoctor/:id", validarJWT, borrarDoctor);

router.put(
  "/editarDoctor/:id",
  upload.single("foto"),
  [
    validarJWT,
    check("cabecera", "La cabecera del doctor es obligatoria").notEmpty(),
    check("nombre", "El nombre del doctor es obligatorio").notEmpty(),
    check("apellidos", "Los apellidos del doctor son obligatorios").notEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("numColegiado", "El número de colegiado es obligatorio").notEmpty(),
    check("telefono_movil", "El teléfono móvil es obligatorio").notEmpty(),
    check("especialidad", "La especialidad es obligatoria").notEmpty(),
    check("dni", "El DNI es obligatorio").notEmpty(),
    validarCampos,
  ],
  actualizarDoctor
);

router.get("/verDoctor/:id", validarJWT, verDoctor);

router.get("/listarDoctores", validarJWT, listarDoctores);

module.exports = router;