const {
  usuarioConectado,
  usuarioDesconectado,
  getUsuarios,
  grabarMensaje,
} = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      // console.log(socket.handshake.query["x-token"]);
      const [valido, uid] = comprobarJWT(socket.handshake.query["x-token"]);
      //metodo para chequear el query
      if (!valido) {
        console.log("socket no identificado");
        return socket.disconnect();
      }

      await usuarioConectado(uid);
      // console.log("cliente conectado", uid);
      //podria asignarlo a usuario y decir se conecto usuario.name

      socket.join(uid);
      //esto me permite mandar mensaje a la sala, igualmente el this.io mandara a todos el msg
      //unirse al user a una sala que sea igual a su uid

      //emitir todos los usuarios conectados
      //await para que devuelva el producto de la funcion y no la promesa
      this.io.emit("lista-usuarios", await getUsuarios());

      //escucho el evento de mensaje personal
      socket?.on("mensaje-personal", async (payload) => {
        // console.log(payload);
        const mensaje = await grabarMensaje(payload);
        // console.log(mensaje);
        this.io.to(payload.para).emit("mensaje-personal", mensaje);
        //tambien mando a de para que queden ambos mensajes grabados, se puede hacer de otra forma tambien
        this.io.to(payload.de).emit("mensaje-personal", mensaje);
      });
      //todos los mensajes deben guardarse en la db sino al ir y volver se limpia
      //payload.para es la sala a la cual se manda el mensaje

      socket.on("disconnect", async () => {
        await usuarioDesconectado(uid);
        // console.log("Cliente desconectado", uid);
        this.io.emit("lista-usuarios", await getUsuarios());
        //para mandar la emision de la desconexion al front
      });
    });
  }
}

//TODOS
//validar jwt, si no es valido desconectar
//saber que usuario esta activo mediante uid
//emitir todos los usuarios conectados
//que el socket ese este unido a determinado uid ya que al refrescar el id cambia
//escuchar cuando un usuario manda mensaje 'mensaje-personal'
//Marcar en la db que el usuario se desconecto
//emitir usuarios conectados

module.exports = Sockets;
