import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./ChatScreen.css";
import { auth, db } from "../component-global/firebase";
import {
  doc,
  onSnapshot,
  Timestamp,
  query,
  getDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuthState } from "react-firebase-hooks/auth";

function ChatScreen({ chatRoomId }) {
  // declaring what data will be used for chat slide
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [partnerInfo, setPartnerInfo] = useState([]);
  const [date, setDate] = useState("");
  // initiating fetching chat logs data. when user opened the chat first
  const [messages, setMessages] = useState([
    () =>
      onSnapshot(doc(db, "chatRooms", chatRoomId), (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
  ]);

  // fetching both users' info and make it usable at both users' end
  const fetchUserInfos = async () => {
    // fecthing data of chat room with chatRoomID that is given from url
    const docSnap = await getDoc(doc(db, "chatRooms", chatRoomId));
    const fetchUsersInfo = () => {
      // refactoring data that is usable for each user's side.
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
    // call the fetchUsersInfo() and store data insde the vars already declared.
    const userData = fetchUsersInfo();
    setName(userData[0]);
    partnerInfo.push(userData[1]);
    setDate(userData[2]);
  };
  useEffect(() => {
    // fecth updated chat logs whenever it updated.
    const q = query(doc(db, "chatRooms", chatRoomId));
    onSnapshot(q, (doc) => {
      const messages = [];
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
    fetchUserInfos();
    messagesShowUp();
  }, []);
  // A function to show messages
  const messagesShowUp = () =>
    messages.map((message) =>
      message.sender != user?.uid ? (
        // print partner's chat log
        <div className="chatScreen_message">
          <Avatar
            className="chatScreen_image"
            alt={message.userName}
            src={partnerInfo[0]?.photo}
          />
          <p className="chatScreen_text">{message.text}</p>
        </div>
      ) : (
        // print user's chat log
        <div className="chatScreen_message">
          <p className="chatScreen_textUser">{message.text}</p>
        </div>
      )
    );
  // submitting chat to db
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
  // rendering chat slide
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
        YOU MATCHED WITH {partnerInfo[0]?.name.toUpperCase()} <br />
        ON {date}
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
