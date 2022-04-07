import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "@material-ui/core";
import "./ChatScreen.css";
import { auth, db } from "./firebase";
import {
  doc,
  onSnapshot,
  Timestamp,
  addDoc,
  query,
  collection,
  getDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import sabrina from "./sabrina.jpg";
import useId from "@mui/material/utils/useId";
import { useAuthState } from "react-firebase-hooks/auth";
import { async } from "@firebase/util";

function ChatScreen() {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([
    () =>
      onSnapshot(doc(db, "chatRooms", "AI3DCiH7NVs3WZb70cSC"), (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
  ]);
  const fetchSenderName = async () => {
    const docSnap = await getDoc(doc(db, "chatRooms", "AI3DCiH7NVs3WZb70cSC"));
    const userName = () => {
      let name = "";
      docSnap.data().users.map((person) => {
        if (person.uid == user?.uid) {
          name = person.name;
        }
      });
      return name;
    };
    setName(userName);
  };
  // const [name, setName] = useState(docSnap.data().users?.(user.uid).name)
  useEffect(() => {
    const q = query(doc(db, "chatRooms", "AI3DCiH7NVs3WZb70cSC"));
    onSnapshot(q, (doc) => {
      const messages = [];
      console.log(doc.data());
      doc.data().chatLogs.map((message) => {
        messages.push({
          sender: message.sender,
          text: message.text,
          sentTime: message.sentTime,
          userName: message.userName
        });
      });
      setMessages(messages);
    });
    fetchSenderName();
    // messagesShowUp();
  }, []);
  const messagesShowUp = () =>
    messages.map((message) =>
      message.sender != user?.uid ? (
        <div className="chatScreen_message">
          <Avatar
            className="chatScreen_image"
            alt={message.userName}
            // src={message.image}
          />
          <p className="chatScreen_text">{message.text}</p>
        </div>
      ) : (
        <div className="chatScreen_message">
          <p className="chatScreen_textUser">{message.text}</p>
        </div>
      )
    );
  const handleSend = async (e) => {
    e.preventDefault();
    const messageSentTime = Timestamp.fromDate(new Date())
    await updateDoc(doc(db, "chatRooms", "AI3DCiH7NVs3WZb70cSC"), {
      chatLogs: arrayUnion({
        userName: name,
        sender: user?.uid,
        text: input,
        sentTime: messageSentTime
      }),
      infos:{
        latestChat: messageSentTime
      }
    });
    setMessages([...messages, { message: input }]);
    setInput("");
  };

  return (
    <div className="chatScreen">
      <div className="twoicons">
        <Link to="/dashboard/chats">
          <IconButton>
            <ArrowBackIosNewIcon className="arrow_icon" fontSize="large" />
          </IconButton>
        </Link>

        <Avatar className="ChatScreenAvatar" src={sabrina} alt="sabrina" />

        <Link to="/favorite">
          <IconButton>
            <FavoriteIcon className="fav_icon" fontSize="large" />
          </IconButton>
        </Link>
      </div>

      <p className="chatScreen_timestamp">
        YOU MATCHED WITH SABRINA ON 10/09/20
      </p>
      {messagesShowUp()}

      <form className="chatScreen_input">
        <input
          onChange={(e) => setInput(e.target.value)}
          className="chatScreen_inputField"
          placeholder="Send a message"
          type="text"
        />
        <button
          onClick={handleSend}
          type="submit"
          className="chatScreen_inputButton"
          value={input}
        >
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatScreen;
