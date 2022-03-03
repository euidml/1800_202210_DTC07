import React from "react";
import "./App.css";
import Login from "./login.js";
import UserRegister from "./Register.js";
import ResetUserPassword from "./Reset.js"
import TinderCards from "./mainProfileCards"
import Dashboard from "./main";
import { Grid } from "@material-ui/core";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/resetpassword" element={<ResetUserPassword/>} />
          <Route exact path="/register" element={<UserRegister/>} />
          <Route exact path="/dashboard" element={<Dashboard/>}/>
          <Route exact path="/tindercards" element={<TinderCards/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
