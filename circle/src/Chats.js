import React, { useEffect, useState } from "react";
import "./Chats.css";
import Chat from "./Chat";
import {
  documentId,
  getDoc,
  orderBy,
  query,
  where,
  getDocs,
  collection,
  doc
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Chats() {
  const [user] = useAuthState(auth);
  const [chatList, setChatList] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(false);
  const fetchChatList = async () => {
    try {
      if (!fetchStatus) {
        
        const q1 = doc(db, "UserInfo", user?.uid);
        const doc1 = await getDoc(q1);
        const data1 = doc1.data().chatRooms;
        let chatRoomList = [];
        data1.map((person) => {
          chatRoomList.push(person.chatRoom);
        });
        console.log(chatRoomList);
        // const q2 = query(collection(db, "chatRooms"), where(documentId(), "in", chatRoomList), orderBy("infos.latestChat"))
        const q2 = query(
          collection(db, "chatRooms"),
          where(documentId(), "in", chatRoomList)
        );
        const data2 = await getDocs(q2);
        data2.forEach((doc) => {
          chatList.push([doc.data(), doc.id]);
          console.log(doc.data(), doc.id)
        setFetchStatus(true)
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const renderChatlist = () => {
    return chatList.map((data) => (
      <Chat
        name={
          data[0].users[0].uid == user?.uid
            ? data[0].users[1].name.split(" ")[0]
            : data[0].users[0].name.split(" ")[0]
        }
        message={data[0].chatLogs.length === 0 ? "You didn't send any message yet.": data[0].chatLogs.pop().text}
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
  useEffect(() => {
    fetchChatList();
  }, []);
  return (
    <div className="chats">
      {renderChatlist()}
    </div>
  );
}

export default Chats;
