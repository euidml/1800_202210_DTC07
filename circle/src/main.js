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
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);
  return (
    <div className="dashboard">
        <PhotoCardSwipe/>
    </div>
  );
}
export default Dashboard;
