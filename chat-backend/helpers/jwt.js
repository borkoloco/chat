const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
  //uso promise para poder usar async luego
  return new Promise((resolve, reject) => {
    //en el payload puedo poner los datos que yo quiera(que no sean sens)
    const payload = { uid };

    //el secret debe ser algo dificil ya que con esa palabra se puede decodificar mi jwt
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

//necesito funcion para chequear quien es la persona que se conecto mediante el uid
const comprobarJWT = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};

module.exports = { generarJWT, comprobarJWT };
