import React from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";

function Chat({ name, message, profilePic, timestamp, chatRoomId }) {
  // the component on chat list.
  return (
    // open chat room as soon as click it
    <Link to={`/chat/${chatRoomId}`}>
      {/* partner info it shows partner's name, pictures, and chat logs such as latest message, time stamp */}
      <div className="chat">
        <Avatar className="chat_image" alt={name} src={profilePic} />
        <div className="chat_details">
          <h2>{name}</h2>
          <p>{message}</p>
        </div>
        <p className="chat_timestamp">{timestamp}</p>
      </div>
      <Divider />
    </Link>
  );
}

export default Chat;
