const Mensaje = require("../models/mensaje");

// al haber pasado la verifdicacion del token yo ya se que usuario es

const obtenerChat = async (req, res) => {
  const miId = req.uid;
  const mensajesDe = req.params.de;

  const last30 = await Mensaje.find({
    //esto es notacion de Mongoose para condicion
    //se puede validar para que sea un uid correcto, o poner trycatch para que no explote
    $or: [
      { de: miId, para: mensajesDe },
      { de: mensajesDe, para: miId },
    ],
  })
    .sort({ createdAt: "asc" }) //sino los ultimos estaran arriba
    .limit(30);

  res.json({
    ok: true,
    mensajes: last30,
  });
};

module.exports = { obtenerChat };
