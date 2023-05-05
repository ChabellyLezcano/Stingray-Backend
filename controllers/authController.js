const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  const { email, nombre, password } = req.body;

  try {
    // Verificar el email
    const usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe con ese email",
      });
    }

    // Crear usuario con el modelo
    const dbUser = new Usuario({
      email,
      nombre,
      password,
    });

    // Hashear la contraseña
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);

    // Guardar usuario en la base de datos
    await dbUser.save();

    // Generar el token
    const token = await generarJWT(dbUser.id, dbUser.nombre);

    // Responder con la información del usuario y el token
    res.json({
      ok: true,
      uid: dbUser.id,
      nombre: dbUser.nombre,
      email: dbUser.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};



const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const dbUser = await Usuario.findOne({ email });

    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        msg: "El correo no existe",
      });
    }

    // Confirmar si el password hace match
    const validPassword = bcrypt.compareSync(password, dbUser.password);

    if (!validPassword) {
      return res.status(401).json({
        ok: false,
        msg: "La contraseña no es válida",
      });
    }

    // Generar el JWT
    const token = await generarJWT(dbUser.id, dbUser.nombre);

    // Respuesta del servicio
    return res.json({
      ok: true,
      msg: "Inicio de sesión correcto",
      uid: dbUser.id,
      name: dbUser.nombre,
      email: dbUser.email,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: "Contacte con el administrador",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const { uid } = req;

  const dbUser = await Usuario.findById(uid);

  // Generar el JWT
  const token = await generarJWT(uid, dbUser.nombre);

  return res.json({
    ok: true,
    uid,
    nombre: dbUser.nombre,
    email: dbUser.email,
    token,
  });
};



module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
}