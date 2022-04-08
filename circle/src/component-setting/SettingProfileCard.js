import React, { useState, useEffect } from "react";
import "./SettingProfileCard.css";
import { auth, db } from "../component-global/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";

function SettingProfileCard() {
  const [name, userName] = useState("")
  const [user] = useAuthState(auth);
  const [photo, setPhoto] = useState("");
  const [profileAvailablity] = useState(true)
  const q = doc(db, "UserInfo", user?.uid)

  const fetchUserInfo = async () => {
    try {
      const doc = await getDoc(q);
      const UserInfo = doc.data();
      // assign each data into proper var
      userName(UserInfo.name);
      setPhoto(UserInfo.profilePhoto.photo)
    } catch (err) {
      console.error(err);
    }
  };


  

  useEffect(() => {
    fetchUserInfo();
  }, [user])
  //   // While the file names are the same, the references point to different files
  //   mountainsRef.name === userProfileImageRef.name; // true
  //   mountainsRef.fullPath === userProfileImageRef.fullPath; // false

  return (
    <div className="Card">
      <div className="upper">
        <div className="image">
          <img
            className="profile_img"
            src={photo}
            alt=""
            height="100px"
            width="100px"
          />
        </div>
      </div>
      <div className="lower">
        <h3>{name}</h3>
      </div>
    </div>
  );
}

export default SettingProfileCard;