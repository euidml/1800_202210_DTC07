// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// our web app's Firebase configuration
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

// login with email and password
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// register with email and password
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "UserInfo", user.uid), {
      name,
      authProvider: "local",
      email,
      personalInfo: {
        age: "",
        game: "",
        gender: "",
        hobbies: "",
        sport: ""
      },
      profilePhoto: {
        availability: false,
        photo: ""
      },
      likedPeople: []
    });
    console.log(doc(db, "UserInfo"));
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// send password reset email
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// logout
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
  logout
};
