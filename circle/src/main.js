import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link as RouterDomLink, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth, db } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Header from "./Header.js";
import PhotoCardSwipe from "./mainProfileCards";
import Chats from "./Chats"
import Footer from "./footer";
import TinderCard from "react-tinder-card";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="dashboard">
        <PhotoCardSwipe/>
    </div>
  );
}
export default Dashboard;
