import React from "react";
import "./App.css";
import Login from "./components-login/login.js";
import UserRegister from "./components-login/Register.js";
import ResetUserPassword from "./components-login/Reset.js"
import TinderCards from "./mainProfileCards"
import Dashboard from "./main";
import { Drawer, Grid } from "@material-ui/core";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chats from "./Chats";
import Chat from "./Chat";
import ChatScreen from "./ChatScreen";


function App(){
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/resetpassword" element={<ResetUserPassword/>} />
          <Route exact path="/register" element={<UserRegister/>} />
          <Route exact path="/dashboard" element={<Dashboard/>}/>
          <Route exact path="/tindercards" element={<TinderCards/>}/>
          <Route exact path="/chat/:person" element={<Chat/>}/>
          <Route exact path="/chatscreen" element={<ChatScreen/>}/>

        
        </Routes>
      </Router>
    </div>
  );
}
export default App;
