//esto lo podria hacer en redux

import { types } from "../../types/types";

// const initialState = {
//     uid: "",
//     chatActivo: null, //uid del user al que yo quiero mensajear
//     usuarios: [], //todos los users
//     mensajes: [], //chat seleccionado
//   };

export const chatReducer = (state, action) => {
  switch (action.type) {
    case types.usuariosCargados:
      return {
        ...state,
        usuarios: [...action.payload],
      };

    case types.activarChat:
      if (state.chatActivo === action.payload) return state;
      //esto para que al clikear el mismo chat no actue
      return {
        ...state,
        chatActivo: action.payload,
        mensajes: [],
      };

    case types.nuevoMensaje:
      if (
        state.chatActivo === action.payload.de ||
        state.chatActivo === action.payload.para
      ) {
        return {
          ...state,
          mensajes: [...state.mensajes, action.payload],
        };
      } else {
        return state;
      }

    case types.cargarMensajes:
      return {
        ...state,
        mensajes: [...action.payload],
      };

    case types.cerrarSesion:
      return {
        uid: "",
        chatActivo: null,
        usuarios: [],
        mensajes: [],
      };
    default:
      return state;
  }
};
