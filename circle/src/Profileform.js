import "../src/Profilepage.css";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import {setDoc, doc } from "firebase/firestore";
import editUserInfo from "./ProfileFormDB"
// import "firebase/auth"
import "firebase/firestore"


const Profileform = () => {
  const [user, loading, error] = useAuthState(auth);
  var [name, setName] = useState("");
  var [age, setAge] = useState("");
  var [gender, setGender] = useState("");
  var [sport, setSport] = useState("");
  var [hobbies, setHobbies] = useState("");
  var [game, setGame] = useState("");
//   auth.onAuthStateChanged((user) => {
//     // Check if user is signed in:
//     if (user) {
//       //go to the correct user document by referencing to the user uid
//       //get the document for current user.
//       collection(db, "UserInfo")
//         .doc(user.uid)
//         .get()
//         .then((UserInfoDoc) => {
//           //get the data fields of the user
//           var userName = UserInfoDoc.data().name;
//           var userAge = UserInfoDoc.data().age;
//           var userGender = UserInfoDoc.data().gender;

//           //if the data fields are not empty, then write them in to the form.
//           if (userName != null) {
//             document.getElementById("nameInput").value = userName;
//           }
//           if (userAge != null) {
//             document.getElementById("ageInput").value = userAge;
//           }
//           if (userGender != null) {
//             document.getElementById("genderInput").value = userGender;
//           }
//         });
//     }
//   });

  //   const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDoc(doc(db, "UserInfo", user.uid), {
        name: name,
        age: age,
        gender: gender,
        sport: sport,
        hobbies: hobbies,
        game: game,
      })
      .then(() => {
        alert("Information Successfully Saved!");
        // setLoader(false);
      })
      .catch((error) => {
        alert(error.message);
        // setLoader(false);
      });
    // editUserInfo(user.uid,name, age, gender, sport, hobbies, game)
    // setLoader(true);
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
        id="mainSportInput"
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
        id="twoTruthOneLieInput"
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
