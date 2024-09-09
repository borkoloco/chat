const { Router } = require("express");
const { crearUsuario, login, renewToken } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// path par auth /api/login

router.post(
  "/new",
  [
    check("nombre", "el nombre debe ser string").isString().not().isEmpty(),
    check("password", "el password debe ser string").isString().not().isEmpty(),
    check("email", "el mail es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);

//si pongo segundo argumento sera un middleware
router.post(
  "/",
  [
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

//al ser un solo middleware no hace falta el array
router.get("/renew", validarJWT, renewToken);

module.exports = router;
