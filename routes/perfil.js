const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  crearPerfil,
  actualizarPerfil,
    verPerfil
} = require("../controllers/perfilController");
const { upload } = require("../middlewares/upload");

const router = Router();


router.post(
    "/crearPerfil",
    upload.single("foto"),
    [
      validarJWT,
      check("nif", "El NIF es obligatorio").notEmpty(),
      check("telefono_movil", "El teléfono móvil es obligatorio").notEmpty(),
      check("telefono_fijo", "El teléfono fijo es obligatorio").notEmpty(),
      check("direccion", "La dirección es obligatoria").notEmpty(),
      check("cp", "El código postal es obligatorio").notEmpty(),
      check("municipio", "El municipio es obligatorio").notEmpty(),
      check("provincia", "La provincia es obligatoria").notEmpty(),
      validarCampos,
    ],
    crearPerfil
  );
  
  router.put(
    "/editarPerfil/:id",
    [
        validarJWT,
        check("nif", "El NIF es obligatorio").notEmpty(),
        check("telefono_movil", "El teléfono móvil es obligatorio").notEmpty(),
        check("telefono_fijo", "El teléfono fijo es obligatorio").notEmpty(),
        check("direccion", "La dirección es obligatoria").notEmpty(),
        check("cp", "El código postal es obligatorio").notEmpty(),
        check("municipio", "El municipio es obligatorio").notEmpty(),
        check("provincia", "La provincia es obligatoria").notEmpty(),
        validarCampos,
    ],
    actualizarPerfil
  );
  
  router.get("/verPerfil/:id", validarJWT, verPerfil);
  
  module.exports = router;

module.exports = router;