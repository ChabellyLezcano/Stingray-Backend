const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  crearProducto,
  borrarProducto,
  editarProducto,
  verProducto,
  listarProductos,
} = require("../controllers/ProductoController");
const { validarJWT } = require("../middlewares/validar-jwt");
const { upload } = require("../middlewares/upload");


const router = Router();

router.post(
  "/crearProducto",
  upload.single("foto"),
  [
    validarJWT,
    check("nombre", "El nombre del producto es obligatorio").not().isEmpty(),
    check("categoria", "La categoría del producto es obligatoria").not().isEmpty(),
    check("marca", "La marca del producto es obligatoria").not().isEmpty(),
    check("descripcion", "La descripcion del producto es obligatoria").not().isEmpty(),
    check("precio", "El precio del producto es obligatorio").not().isEmpty(),
    check("precio", "El precio del producto debe ser un número").isNumeric(),
    check("unidades", "Las unidades del producto son obligatorias").not().isEmpty(),
    check("unidades", "Las unidades del producto deben ser un número entero").isInt(),
    validarCampos,
  ],
  crearProducto
);

router.delete("/borrarProducto/:id", validarJWT, borrarProducto);

router.put(
  "/editarProducto/:id",
  upload.single("foto"),
  [
    validarJWT,
    check("nombre", "El nombre del producto es obligatorio").not().isEmpty(),
    check("categoria", "La categoría del producto es obligatoria").not().isEmpty(),
    check("marca", "La marca del producto es obligatoria").not().isEmpty(),
    check("descripcion", "La descripcion del producto es obligatoria").not().isEmpty(),
    check("precio", "El precio del producto es obligatorio").not().isEmpty(),
    check("precio", "El precio del producto debe ser un número").isNumeric(),
    check("unidades", "Las unidades del producto son obligatorias").not().isEmpty(),
    check("unidades", "Las unidades del producto deben ser un número entero").isInt(),
    validarCampos,
  ],  
  editarProducto
);

router.get("/listarProductos", [validarJWT], listarProductos);

module.exports = router;
