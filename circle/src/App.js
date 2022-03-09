import React from "react";
import "./App.css";
import Login from "./components-login/login.js";
import UserRegister from "./components-login/Register.js";
import ResetUserPassword from "./components-login/Reset.js";
import Header from "./Header.js";
import Dashboard from "./main";
import Chats from "./Chats";
import Footer from "./footer";
import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="app">
      {user&&<Header />}
      <Routes>
        {console.log(useLocation())}
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<UserRegister />} />
        <Route exact path="/resetpassword" element={<ResetUserPassword />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/dashboard/chats" element={<Chats/>} />
        
      </Routes>
      {user&&<Footer />}
    </div>
  );
}

export default App;
