import React, { useContext } from "react";
import { SidebarChatItem } from "./SidebarChatItem";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";

export const Sidebar = () => {
  // const chats = [1, 2, 3, 4, 5];

  //en el objeto auth se encuentra el uid del user, si quiero filtrarlo lo hago en el map por uid
  //eso para hacer el filtro en el front, tambien puedo hacerlo en el back

  const { auth } = useContext(AuthContext);
  const { uid } = auth;

  const { chatState } = useContext(ChatContext);

  return (
    <div className="inbox_chat">
      {chatState.usuarios
        .filter((user) => user.uid !== uid)
        .map((usuario) => (
          <SidebarChatItem key={usuario.uid} usuario={usuario} />
        ))}

      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>
    </div>
  );
};
