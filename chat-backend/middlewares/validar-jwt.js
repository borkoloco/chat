const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
  try {
    //asi lo voy a guardar en los headers
    const token = req.header("x-token");

    if (!token) {
      //si no pongo el return sigue de largo, no corta
      return res.status(401).json({
        ok: false,
        msg: "No hay token en la peticion",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.uid = payload.uid;

    //o tambien puedo desestructurar desde payload {uid}= jwt.verify....

    // res.json({
    //   payload,
    // });
    // res.json({
    //   ok: true,
    //   token,
    // });

    // si todo sale bien llamamos al NEXT
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token invalido",
    });
  }
};

module.exports = { validarJWT };
