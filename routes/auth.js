const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken
} = require("../controllers/authController");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Crear un nuevo usuario
router.post(
  "/registro",
  [
    check("nombre", "El campo del nombre está vacío").notEmpty(),
    check("email", "El campo del email está vacío").notEmpty(),
    check("email", "El formato del email es incorrecto").isEmail(),
    check("password", "El campo de la contraseña está vacío").notEmpty(),
    check(
        "password",
        "La contraseña debe tener al menos 8 caracteres"
      ).isLength({ min: 8 }),
      check(
        "password",
        "La contraseña debe contener al menos un número y una mayúscula"
      ).matches(/^(?=.*[A-Z])(?=.*\d)/),
    check(
      "validatePassword",
      "El campo de la contraseña está vacío"
    ).notEmpty(),
    check(
        "validatePassword",
        "La contraseña debe tener al menos 8 caracteres"
      ).isLength({ min: 8 }),
      check(
        "validatePassword",
        "La contraseña debe contener al menos un número y una mayúscula"
      ).matches(/^(?=.*[A-Z])(?=.*\d)/),
    validarCampos,
  ],
  crearUsuario
);

// Login de usuario
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").isLength({ min: 8 }),
    validarCampos,
  ],
  loginUsuario
);

// Validar y revalidar token
router.get( '/renew', validarJWT , revalidarToken );



module.exports = router;