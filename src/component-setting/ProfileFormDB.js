import {  db } from "../component-global/firebase";
import { doc, updateDoc } from "firebase/firestore";

function editUserInfo(uid, name, age, gender, sport, hobbies, game){
  const currentUserInfo = doc(db, "UserInfo", uid)
  updateDoc(currentUserInfo, {
    name: name,
      "personalInfo":{
      age: age,
      gender: gender,
      sport: sport,
      hobbies: hobbies,
      game: game,}
  }).then(() => {
        alert("Information Successfully Saved!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };


export default editUserInfo