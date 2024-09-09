const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  // aqui se guardan los errores que son producto del check
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errores.mapped(),
    });
  }

  next();
  //llamamos next si todo sale bien, else se corta
};

module.exports = { validarCampos };
