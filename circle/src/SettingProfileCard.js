import React, { useState, useEffect } from "react";
import "./SettingProfileCard.css";
import { auth, useAuth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";

function SettingProfileCard() {
  const [name, userName] = useState("")
  const [user] = useAuthState(auth);
  const [photoURL, setPhotoURL] = useState("https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png");

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

  // const handleSubmit = (e) => {
  //   const storage = getStorage();
  //   const userProfileImageRef = ref(storage, user.uid + picture.name);
  //   console.log(userProfileImageRef);
  //   uploadBytes(userProfileImageRef, picture).then((snapshot) => {
  //     console.log("Uploaded a blob or file!");
  //   });
  //   getDownloadURL(userProfileImageRef).then((url) => {
  //     console.log(url);
  //     const xhr = new XMLHttpRequest();
  //     xhr.responseType = "blob";
  //     xhr.onload = (event) => {
  //       const blob = xhr.response;
  //     };
  //     xhr.open("GET", url);
  //     xhr.send();
  //     const currentUserInfo = doc(db, "UserInfo", user.uid);
  //     console.log(url)
  //     updateDoc(currentUserInfo, {
  //       profilePhoto: {
  //         availability: true,
  //         photo: url
  //       }
  //     });
  //   });
  // };

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
      fetchUserInfo();
    }
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
            src={photoURL}
            alt=""
            height="100px"
            width="100px"
          />
        </div>
      </div>
      <div className="lower">
        <h3>{name}</h3>
      </div>
      {/* <span class="btn btn-primary btn-file"> Find image
      <input
        type={"file"}
        className="Setting_input"
        // onChange={(e) => {
        //   setPicture([...picture, e.target.files[0]]);
        // }}
        onChange={(e) => {
          setPicture(e.target.files[0]);
          console.log(e.target.files);
          console.log(picture);
        }}>
        </input>
        </span> */}
      {/* <button className="Setting_upload" onClick={handleSubmit}>
        Upload
      </button> */}
    </div>
  );
}

export default SettingProfileCard;