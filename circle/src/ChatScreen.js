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

function ChatScreen({ chatRoomId }) {
  console.log(chatRoomId);
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [partnerInfo, setPartnerInfo] = useState([]);
  const [date, setDate] = useState("");
  const [messages, setMessages] = useState([
    () =>
      onSnapshot(doc(db, "chatRooms", chatRoomId), (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
  ]);
  console.log(messages, partnerInfo, date);
  const fetchUserNames = async () => {
    const docSnap = await getDoc(doc(db, "chatRooms", chatRoomId));
    console.log(docSnap.data());
    const fetchUsersInfo = () => {
      const createdDate = docSnap
        .data()
        .infos.chatRoomCreatedAt.toDate()
        .toDateString();
      let userName = "";
      let partnerName = "";
      let partnerPhoto = "";
      docSnap.data().users.map((person) => {
        if (person.uid == user?.uid) {
          userName = person.name;
        } else {
          // setPartnerInfo([person.name, person.photo])
          // setPartnerInfo(prevState => ({...prevState, name: person.name, photo:person.photo}))
          partnerName = person.name;
          partnerPhoto = person.photo;
        }
      });
      return [
        userName,
        { name: partnerName, photo: partnerPhoto },
        createdDate
      ];
    };
    const userData = fetchUsersInfo();
    setName(userData[0]);
    partnerInfo.push(userData[1]);
    setDate(userData[2]);
  };
  // const [name, setName] = useState(docSnap.data().users?.(user.uid).name)
  useEffect(() => {
    const q = query(doc(db, "chatRooms", chatRoomId));
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
    fetchUserNames();
    messagesShowUp();
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
    const messageSentTime = Timestamp.fromDate(new Date());
    await updateDoc(doc(db, "chatRooms", chatRoomId), {
      chatLogs: arrayUnion({
        userName: name,
        sender: user?.uid,
        text: input,
        sentTime: messageSentTime
      }),
      "infos.latestChat": messageSentTime
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

        <Avatar
          className="ChatScreenAvatar"
          src={partnerInfo[0]?.photo}
          alt={partnerInfo[0]?.name}
        />

        <Link to="/favorite">
          <IconButton>
            <FavoriteIcon className="fav_icon" fontSize="large" />
          </IconButton>
        </Link>
      </div>

      <p className="chatScreen_timestamp">
        YOU MATCHED WITH {partnerInfo[0]?.name.toUpperCase()} <br/>ON {date}
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
