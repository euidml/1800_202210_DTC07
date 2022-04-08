import React, { useEffect, useState } from "react";
import "./Favorite.css";
import {
  collection,
  getDoc,
  doc,
  query,
  getDocs,
  where,
  documentId,
  addDoc,
  Timestamp,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import { auth, db } from "../component-global/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// redering "liked" page
function Favorite() {
  // declaring data we will use
  const [name, setName] = useState("");
  const [photoRef, setPhotoRef] = useState("");
  const [user] = useAuthState(auth);
  const [favouritePeople, setFavourtiePeople] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(true);
  // fectch data of like people
  const fetchFavouriteProfiles = async () => {
    try {
      if (fetchStatus) {
        // fetch list of liked people
        const docRef = doc(db, "UserInfo", user?.uid);
        const userData = (await getDoc(docRef)).data();
        setName(userData.name);
        setPhotoRef(userData.profilePhoto.photo);
        const userFavouriteList = userData.likedPeople;
        // fecch info/data of liked people
        const userRef = collection(db, "UserInfo");
        const q = query(userRef, where(documentId(), "in", userFavouriteList));
        const data = await getDocs(q);
        // storing data of liked people.
        data.forEach((doc) => {
          favouritePeople.push([doc.data(), doc.id]);
        });
        setFetchStatus(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // A function to create a chat room
  const createChatRoom = async (partnerUid, partnerName, partnerPictureSrc) => {
    // create chat room at "chatRooms" collection
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
      chatLogs: []
    });
    // append info of chat room for each user's side
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
  // rendering and populating proflie of liked people
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
  // rendering the page.
  return (
    <div>
      <h2 className="fav">💛 Your liked people 💛</h2>
      <div className="img_container">{rendering()}</div>
    </div>
  );
}

export default Favorite;
