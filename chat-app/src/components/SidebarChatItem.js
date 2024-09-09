import { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import { scrollToBottom } from "../helpers/scrollToBottom";

export const SidebarChatItem = ({ usuario }) => {
  // console.log(usuario)
  const { chatState, dispatch } = useContext(ChatContext);
  const { chatActivo } = chatState;

  const onClick = async () => {
    dispatch({
      type: types.activarChat,
      payload: usuario.uid,
    });
    //aca puedo cargar los mensajes del chat
    const resp = await fetchConToken(`mensajes/${usuario.uid}`);
    dispatch({
      type: types.cargarMensajes,
      payload: resp.mensajes,
    });
    //mover scroll
    scrollToBottom("mensajes");
  };

  return (
    // <div onClick={onClick} className="chat_list active_chat">
    <div
      onClick={onClick}
      className={`chat_list ${usuario.uid === chatActivo && "active_chat"}`}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{usuario.nombre}</h5>
          {usuario.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};

/* <!-- conversación inactiva inicio --> */

/* <div className="chat_list">
        <div className="chat_people">
          <div className="chat_img">
            <img
              src="https://ptetutorials.com/images/user-profile.png"
              alt="sunil"
            />
          </div>
          <div className="chat_ib">
            <h5>
              Sunil Rajput <span className="chat_date">Dec 25</span>
            </h5>
            <p>
              Test, which is a new approach to have all solutions astrology
              under one roof.
            </p>
          </div>
        </div>
      </div> */

/* <!-- conversación inactiva inicio --> */
