const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
//pongo U mayuscula para poder crear instancias del modelo

//siempre async ya que las peticiones a db son tareas asincronas
const crearUsuario = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const existeEmail = await Usuario.findOne({ email });

    // console.log(existeEmail);
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }

    const usuario = new Usuario(req.body);

    //ecriptar pasword antes de guardarlo
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //guardar user en db
    await usuario.save();

    //generamos jwt para verificar al user (tambien se usara para el logueo)

    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    //no es un error que deberia esperar, si pasa debe ser interno
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }

  //   const { nombre, email, password } = req.body;
  //   res.json({
  //     ok: true,
  //     msg: "new",
  //     email,
  //     password,
  //     nombre,
  //   });
};

// const login = async (req, res = response) => {
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //primero verifico que exista user
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      //Ver cuando poner y cuando no poner return
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    //si existe, verificar password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    }

    // si llegamos aca es porque es correcta, ergo genero jwt

    const token = await generarJWT(usuarioDB.id);
    res.json({
      ok: true,
      usuario: usuarioDB,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }

  // res.json({
  //   ok: true,
  //   // msg: "login",
  //   // email,
  //   // password,
  // });
};

const renewToken = async (req, res) => {
  const uid = req.uid;

  //verificamos el uid que guardamos en req
  //generamos nuevo jwt
  const token = await generarJWT(uid);

  //mandamos tambien usuario
  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    token,
    usuario,
    // msg: "renew",
  });
};

module.exports = { crearUsuario, login, renewToken };
