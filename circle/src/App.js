import React from "react";
import "./App.css";
import Login from "./components-login/login.js";
import UserRegister from "./components-login/Register.js";
import ResetUserPassword from "./components-login/Reset.js";
import Header from "./Header.js";
import Dashboard from "./main";
import Chats from "./Chats";
import ChatScreen from "./ChatScreen";
import ProfilePage from "./Profilepage"
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
      {useLocation().pathname.includes("/dashboard")&&<Header />}
      {/* {user&&<Header />} */}
      <Routes>
        {console.log(useLocation())}
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<UserRegister />} />
        <Route exact path="/resetpassword" element={<ResetUserPassword />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/dashboard/chats" element={<Chats />} />
        <Route exact path="/chat/:person" element={<ChatScreen />} />
        <Route exact path="/dashboard/profile" element={<ProfilePage />} />
      </Routes>
      {useLocation().pathname.includes("/dashboard")&&<Footer />}
      {/* {user&&<Footer />} */}
    </div>
  );
}

export default App;
