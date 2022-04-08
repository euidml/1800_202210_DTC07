import React, { useEffect, useState } from "react";
import "./Chats.css";
import Chat from "./Chat";
import {
  documentId,
  getDoc,
  query,
  where,
  getDocs,
  collection,
  doc
} from "firebase/firestore";
import { auth, db } from "../component-global/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Chats() {
  // declaring datas that are used inside the Chats()
  const [user] = useAuthState(auth);
  const [chatList, setChatList] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(false);
  // function fetches user's chat list
  const fetchChatList = async () => {
    try {
      // in order not to fetch several times incorrectly.
      if (!fetchStatus) {
        // query for uids that is in user's chat list
        const q1 = doc(db, "UserInfo", user?.uid);
        const doc1 = await getDoc(q1);
        const data1 = doc1.data().chatRooms;
        let chatRoomList = [];
        data1.map((person) => {
          chatRoomList.push(person.chatRoom);
        });
        // query for the info of uids in the chat list
        const q2 = query(
          collection(db, "chatRooms"),
          where(documentId(), "in", chatRoomList)
        );
        const data2 = await getDocs(q2);
        data2.forEach((doc) => {
          chatList.push([doc.data(), doc.id]);
          setFetchStatus(true);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const renderChatlist = () => {
    // a function to list each chat bubble
    return chatList.map((data) => (
      <Chat
        // each chat bubble accepts partner's name, latest message, timestamp of lateset message, and profile picture link as an arguments
        name={
          data[0].users[0].uid == user?.uid
            ? data[0].users[1].name.split(" ")[0]
            : data[0].users[0].name.split(" ")[0]
        }
        message={
          data[0].chatLogs.length === 0
            ? "You didn't send any message yet."
            : data[0].chatLogs.pop().text
        }
        timestamp={data[0].infos.latestChat.toDate().toDateString()}
        profilePic={
          data[0].users[0].uid == user?.uid
            ? data[0].users[1].photo
            : data[0].users[0].photo
        }
        chatRoomId={data[1]}
      />
    ));
  };
  // fetch data whenver state of data has changed.
  useEffect(() => {
    fetchChatList();
  }, []);
  // render pages for chat bubbles
  return <div className="chats">{renderChatlist()}</div>;
}

export default Chats;
