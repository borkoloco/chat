import { createContext, useCallback, useContext, useState } from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/types";

export const AuthContext = createContext();

//esto lo puedo hacer con redux, aca lo hacemos asi y con useReducer
const initialState = {
  uid: null,
  checking: true,
  //esto es una especie de bandera para dejar en standby
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const { dispatch } = useContext(ChatContext);

  const login = async (email, password) => {
    const resp = await fetchSinToken("login", { email, password }, "POST");
    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { usuario } = resp;
      //   console.log(usuario)
      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });
      //   console.log("Autenticado");
    }
    return resp.ok;
  };

  // aca tenia que ir el nombre
  const register = async (nombre, email, password) => {
    const resp = await fetchSinToken(
      "login/new",
      { nombre, email, password },
      "POST"
    );
    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { usuario } = resp;
      //   console.log(usuario)
      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });
      //   console.log("Registrado");
    }
    return resp.ok;
  };

  //para verificar token uso usecallback porque sera usada en useEffect y la idea es que no se dispare seguido
  const verificaToken = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }
    const resp = await fetchConToken("login/renew");
    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { usuario } = resp;
      setAuth({
        uid: usuario.uid,
        checking: false,
        logged: true,
        name: usuario.nombre,
        email: usuario.email,
      });
      //   console.log("Autenticado");
      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");

    dispatch({
      type: types.cerrarSesion,
    });

    setAuth({
      checking: false,
      logged: false,
    });
  };
  return (
    <AuthContext.Provider
      value={{ login, register, verificaToken, logout, auth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
