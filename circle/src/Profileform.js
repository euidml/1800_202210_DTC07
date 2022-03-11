import "../src/Profilepage.css";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { setDoc, getDoc, doc } from "firebase/firestore";
import editUserInfo from "./ProfileFormDB";

const Profileform = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  var [age, setAge] = useState("");
  var [gender, setGender] = useState("");
  var [sport, setSport] = useState("");
  var [hobbies, setHobbies] = useState("");
  var [game, setGame] = useState("");
  const [loader, setLoader] = useState(true);
  const [refresh, setRefresh] = useState(true);
//   if (refresh) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const currentUserInfo = getDoc(doc(db, "UserInfo", user.uid))
        currentUserInfo.then((UserInfoDoc) => {
        //   for (const item in UserInfoDoc.data()) {
        //     if (item != null) {
        //         console.log(item, UserInfoDoc.data()[item])
        //       document.getElementById(`${item}Input`).value =
        //         UserInfoDoc.data()[item];
        //     }
        //   }
        if (UserInfoDoc.data()[name]!= null) {
            console.log(UserInfoDoc.data()[name])
            document.getElementById(`nameInput`).value = UserInfoDoc.data()[name];}
        });
      }
    });
    // setRefresh(false);
//   }
  const handleSubmit = (e) => {
    e.preventDefault();
    editUserInfo(user.uid, name, age, gender, sport, hobbies, game);
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1> Profile Information </h1>

      <label> Name </label>
      <input
        id="nameInput"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label> Age </label>
      <input
        id="ageInput"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <label> Gender </label>
      <input
        id="genderInput"
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />

      <label> Main sport </label>
      <input
        id="sportInput"
        placeholder="Sport"
        value={sport}
        onChange={(e) => setSport(e.target.value)}
      />

      <label> Hobbies </label>
      <input
        id="hobbiesInput"
        placeholder="Hobbies"
        value={hobbies}
        onChange={(e) => setHobbies(e.target.value)}
      />

      <label> Two Truths, One Lie </label>
      <textarea
        id="gameInput"
        placeholder="Game"
        value={game}
        onChange={(e) => setGame(e.target.value)}
      >
        {" "}
      </textarea>

      <button
        type="submit"
        // style={{ background: loader ? "#ccc" : "rgb(2, 2, 110)" }}
      >
        {" "}
        Submit{" "}
      </button>
    </form>
  );
};

export default Profileform;
