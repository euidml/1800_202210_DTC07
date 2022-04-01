import React, { useState, useEffect } from "react";
import "./SettingProfileCard.css";
import { auth, useAuth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";

function SettingProfileCard() {
  const [people, setPeople] = useState([]);
  const [name, userName] = useState("")
  const [user] = useAuthState(auth);
  const [picture, setPicture] = useState();
  const [profileAvailablity] = useState(true)
  const q = doc(db, "UserInfo", user?.uid)


  const fetchUserInfo = async () => {
    try {
      const doc = await getDoc(q);
      const UserInfo = doc.data();
      // assign each data into proper var
      userName(UserInfo.name);

    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };


  // Create a root references

  // Create a reference to 'images/mountains.jpg'

  const handleSubmit = (e) => {
    const storage = getStorage();
    const userProfileImageRef = ref(storage, user.uid + picture.name);
    console.log(userProfileImageRef);
    uploadBytes(userProfileImageRef, picture).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    getDownloadURL(userProfileImageRef).then((url) => {
      console.log(url);
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();
      const currentUserInfo = doc(db, "UserInfo", user.uid);
      console.log(url)
      updateDoc(currentUserInfo, {
        profilePhoto: {
          availability: profileAvailablity,
          photo: url
        }
      });
    });
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
            src={''}
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