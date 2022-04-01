// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import {
getFirestore,
query,
getDocs,
collection,
where,
 addDoc,
 doc,
 setDoc,
 onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {getStorage, ref, uploadBytes} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmzvJ1GBqdhcNNhvtcnTDkZLTZ4rkVWNA",
  authDomain: "circle-11d32.firebaseapp.com",
  projectId: "circle-11d32",
  storageBucket: "circle-11d32.appspot.com",
  messagingSenderId: "642766172673",
  appId: "1:642766172673:web:7a68f4fdb6e04615cd0600"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();



const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "UserInfo", user.uid), {
      // uid: user.uid,
      name,
      authProvider: "local",
      email,
      personalInfo:{
        age:"",
        game:"",
        gender:"",
        hobbies: "",
        sport:""
      },
      profilePhoto:{
        availability:false,
        photo:""
      }
    })
    console.log(doc(db, "UserInfo"))
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
const logout = () => {
  signOut(auth);
};
export {
    auth,
    db,
    app,
    logInWithEmailAndPassword,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };

  // Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, users => setCurrentUser(users) );
    return unsub;
  }, [])

  return currentUser;
}

// Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png')

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);

  setLoading(false);
  alert("Uploaded file!")
}
