const { Router } = require("express");
const { check } = require("express-validator");
const {
crearTratamiento,
borrarTratamiento,
editarTratamiento,
listarTratamientosSinPiezaNumero
} = require("../controllers/tratamientoController");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Crear un nuevo tratamiento
router.post(
"/crearTratamiento",
[
validarJWT,
check("nombre", "El nombre del tratamiento es obligatorio").not().isEmpty(),
check("precio", "El precio del tratamiento es obligatorio").not().isEmpty(),
check("categoria", "La categoría del tratamiento es obligatoria").not().isEmpty(),
validarCampos,
],
crearTratamiento
);

// Listar todos los tratamientos sin pieza ni número
router.get(
"/listarTratamientoSinPiezaSinNumero",
[
validarJWT,
],
listarTratamientosSinPiezaNumero
);

// Borrar un tratamiento por ID
router.delete(
"/borrarTratamiento/:id",
[
validarJWT,
],
borrarTratamiento
);

// Editar un tratamiento por ID
router.put(
"/editarTratamiento/:id",
[
validarJWT,
check("nombre", "El nombre del tratamiento es obligatorio").not().isEmpty(),
check("precio", "El precio del tratamiento es obligatorio").not().isEmpty(),
check("categoria", "La categoría del tratamiento es obligatoria").not().isEmpty(),
validarCampos,
],
editarTratamiento
);

module.exports = router;