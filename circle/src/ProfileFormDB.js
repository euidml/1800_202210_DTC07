import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";




function editUserInfo(uid, name, age, gender, sport, hobbies, game){
    setDoc(doc(db, "UserInfo", uid), {
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


export default editUserInfo

// const Profileform = () => {
//     const [user, loading, error] = useAuthState(auth);
//     var [name, setName] = useState("");
//     var [age, setAge] = useState("");
//     var [gender, setGender] = useState("");
//     var [sport, setSport] = useState("");
//     var [hobbies, setHobbies] = useState("");
//     var [game, setGame] = useState("");
//     auth.onAuthStateChanged((user) => {
//       // Check if user is signed in:
//       if (user) {
//         //go to the correct user document by referencing to the user uid
//         //get the document for current user.
//           getDoc(doc(db, "UserInfo", user.uid))
//           .then((UserInfoDoc) => {
//           //   //get the data fields of the user
//           //   var userName = UserInfoDoc.data().name;
//           //   var userAge = UserInfoDoc.data().age;
//           //   var userGender = UserInfoDoc.data().gender;
  
//           //   //if the data fields are not empty, then write them in to the form.
//           //   if (userName != null) {
//           //     document.getElementById("nameInput").value = userName;
//           //   }
//           //   if (userAge != null) {
//           //     document.getElementById("ageInput").value = userAge;
//           //   }
//           //   if (userGender != null) {
//           //     document.getElementById("genderInput").value = userGender;
//           //   }
//           //   if (userGender != null) {
//           //     document.getElementById("genderInput").value = userGender;
//           //   }
//           console.log(UserInfoDoc.data())
//             for (const item in UserInfoDoc.data()){
//                 if (item != null) {
//                     console.log(item, UserInfoDoc.data()[item]) 
//                   document.getElementById(`${item}Input`).value = UserInfoDoc.data()[item]
//                 }
//             }
//           });
//       }
//     });
// }