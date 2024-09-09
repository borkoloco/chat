import React from "react";
import { horaMes } from "../helpers/horaMes";

export const IncomingMessage = ({ msg }) => {
  // horaMes(msg.createdAt);

  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img
          src="https://ptetutorials.com/images/user-profile.png"
          alt="sunil"
        />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          {/* <p>Test which is a new approach to have all solutions</p> */}
          <p>{msg.mensaje}</p>
          <span className="time_date">{horaMes(msg.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
