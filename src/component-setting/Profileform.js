import "./Profilepage.css";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../component-global/firebase";
import { getDoc, doc } from "firebase/firestore";
import editUserInfo from "./ProfileFormDB";

const Profileform = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState("");
  var [age, setAge] = useState("");
  var [gender, setGender] = useState("");
  var [sport, setSport] = useState("");
  var [hobbies, setHobbies] = useState("");
  var [game, setGame] = useState("");
  const [refresh, setRefresh] = useState(true);
  {
    refresh &&
      auth.onAuthStateChanged((user) => {
        if (user) {
          const currentUserInfo = getDoc(doc(db, "UserInfo", user.uid));
          currentUserInfo.then((UserInfoDoc) => {
            for (const item in UserInfoDoc.data()) {
              if (item != null) {
                console.log(item, UserInfoDoc.data()[item]);
                age = UserInfoDoc.data()[age];
              }
            }
          });
          setRefresh(false);
        }
      });
  }
  // When user submits answer, change value in the firebase to the new user input
  const handleSubmit = (e) => {
    e.preventDefault();
    editUserInfo(user.uid, name, age, gender, sport, hobbies, game);
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1> Profile Information </h1>
{/* Value for User's Name */}
      <label> Full Name </label>
      <input
        id="nameInput"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
{/* Value for User's Age */}
      <label> Age </label>
      <input
        id="ageInput"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
{/* Value for User's Gender */}
      <label> Gender </label>
      <input
        id="genderInput"
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
{/* Value for User's Sport */}
      <label> Main sport </label>
      <input
        id="sportInput"
        placeholder="Sport"
        value={sport}
        onChange={(e) => setSport(e.target.value)}
      />
{/* Value for User's Hobbies */}
      <label> Hobbies </label>
      <input
        id="hobbiesInput"
        placeholder="Hobbies"
        value={hobbies}
        onChange={(e) => setHobbies(e.target.value)}
      />
{/* Value for User's Question */}
      <label> Two Truths, One Lie </label>
      <textarea
        id="gameInput"
        placeholder="Game"
        value={game}
        onChange={(e) => setGame(e.target.value)}
      >
        {" "}
      </textarea>

      <button type="submit"> Submit </button>
    </form>
  );
};

export default Profileform;
