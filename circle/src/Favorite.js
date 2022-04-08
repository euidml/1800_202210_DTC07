import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";
import "./Favorite.css";
import { async } from "@firebase/util";
import {
  collection,
  getDoc,
  doc,
  query,
  getDocs,
  where,
  documentId,
  setDoc,
  addDoc,
  Timestamp,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Favorite() {
  const [name, setName] = useState("");
  const [photoRef, setPhotoRef] = useState("");
  const [user] = useAuthState(auth);
  const [favouritePeople, setFavourtiePeople] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(true);
  const fetchFavouriteProfiles = async () => {
    try {
      if (fetchStatus) {
        const docRef = doc(db, "UserInfo", user?.uid);
        const userData = (await getDoc(docRef)).data();
        setName(userData.name);
        setPhotoRef(userData.profilePhoto.photo);
        const userFavouriteList = userData.likedPeople;
        const userRef = collection(db, "UserInfo");
        const q = query(userRef, where(documentId(), "in", userFavouriteList));
        const data = await getDocs(q);
        data.forEach((doc) => {
          favouritePeople.push([doc.data(), doc.id]);
        });
        setFetchStatus(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const createChatRoom = async (partnerUid, partnerName, partnerPictureSrc) => {
    const docRef = await addDoc(collection(db, "chatRooms"), {
      chatLogs: [],
      infos: {
        chatRoomCreatedAt: Timestamp.fromDate(new Date()),
        latestChat: Timestamp.fromDate(new Date())
      },
      users: [
        { name: name, uid: user.uid, photo: photoRef },
        { name: partnerName, uid: partnerUid, photo: partnerPictureSrc }
      ],
      chatLogs:[]
    });
    await updateDoc(doc(db, "UserInfo", user.uid), {
      chatRooms: arrayUnion({
        chatRoom: docRef.id,
        partnerUid: partnerUid
      })
    });
    await updateDoc(doc(db, "UserInfo", partnerUid), {
      chatRooms: arrayUnion({
        chatRoom: docRef.id,
        partnerUid: user.uid
      })
    });
  };
  const rendering = () => {
    return favouritePeople.map((person) => (
      <div className="images">
        <img
          alt={person[0].name}
          src={person[0].profilePhoto.photo}
          onClick={() =>
            createChatRoom(
              person[1],
              person[0].name,
              person[0].profilePhoto.photo
            )
          }
        ></img>
      </div>
    ));
  };
  useEffect(() => {
    fetchFavouriteProfiles();
  }, []);

  return (
    <div>
      {/* <Link to="/dashboard">
        <IconButton>
        <ArrowBackIosNewIcon className='backarrow' fontSize='large' />
        </IconButton>
        </Link> */}

      <h2 className="fav">💛 Your favorited people</h2>
      <div className="img_container">{rendering()}</div>
    </div>
  );
}

export default Favorite;
