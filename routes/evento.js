const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  crearEvento,
  borrarEvento,
  verEvento,
  editarEvento,
  listarEventos
} = require('../controllers/eventoController');

const router = Router();

// Create a new event
router.post(
  '/crearEvento',
  [
    validarJWT,
    check('fecha', 'La fecha del evento es obligatoria').not().isEmpty(),
    check('titulo', 'El título del evento es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción del evento es obligatoria').not().isEmpty(),
    check('hora', 'La hora del evento es obligatoria').not().isEmpty(),
    validarCampos
  ],
  crearEvento
);

// Delete an event
router.delete('/borrarEvento/:id', [validarJWT], borrarEvento);

// View a specific event
router.get('/verEvento/:id', [validarJWT], verEvento);

// Edit an event
router.put(
  '/editarEvento/:id',
  [
    validarJWT,
    check('fecha', 'La fecha del evento es obligatoria').not().isEmpty(),
    check('titulo', 'El título del evento es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción del evento es obligatoria').not().isEmpty(),
    check('hora', 'La hora del evento es obligatoria').not().isEmpty(),
    validarCampos
  ],
  editarEvento
);

// List all events for a specific user
router.get('/listarEventos', [validarJWT], listarEventos);

module.exports = router;
