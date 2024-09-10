// Servidor de Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");

const Sockets = require("./sockets");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //conectar a db
    dbConnection();

    // Http server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = socketio(this.server, {
      /* configuraciones */
    });
  }

  middlewares() {
    // TODO CORS
    // this.app.use(cors());
    //----------------------------------------------------
    // Permitir solicitudes desde tu frontend específico
    this.app.use(
      cors({
        origin: "https://chat-app-pink-two.vercel.app", // El origen del frontend
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
        credentials: true, // Permitir credenciales si es necesario (cookies, etc.)
      })
    );

    // Asegurarse de que las solicitudes OPTIONS sean manejadas
    this.app.options("*", cors());
    this.app.options("*", (req, res) => {
      res.set(
        "Access-Control-Allow-Origin",
        "https://chat-app-pink-two.vercel.app"
      );
      res.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.set("Access-Control-Allow-Credentials", "true");
      res.sendStatus(204); // Responder con éxito sin contenido para OPTIONS
    });
    //----------------------------------------------------------

    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    //parseo del body...transforma el body a json

    this.app.use(express.json());

    //API ENDPOINTS
    this.app.use("/api/login", require("../router/auth"));
    this.app.use("/api/mensajes", require("../router/mensajes"));

    //cuando le pegue a esa ruta me importara lo del require
  }

  // Esta configuración se puede tener aquí o como propieda de clase
  // depende mucho de lo que necesites
  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    // Inicializar sockets
    this.configurarSockets();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
