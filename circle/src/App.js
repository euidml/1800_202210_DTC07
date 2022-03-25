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
import Favorite from "./Favorite";
import Footer from "./footer";
import Settingpage from "./Settingpage";
import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

function App() {
  const pathname = useLocation().pathname
  return (
    <div className="app">
      {pathname.includes("/dashboard")&&<Header />}
      <Routes>
        {console.log(useLocation())}
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<UserRegister />} />
        <Route exact path="/resetpassword" element={<ResetUserPassword />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/dashboard/chats" element={<Chats  />} />
        <Route exact path="/chat/:person" element={<ChatScreen />} />
        {/* <Route exact path="/dashboard/profile" element={<ProfilePage />} /> */}
        <Route exact path="/bottom/settingpage" element={<Settingpage />} />
        <Route exact path="favorite" element={<Favorite />} />

      </Routes>
      {(pathname.includes("/dashboard") || pathname.includes("/bottom"))&& <Footer />}
      {(pathname.includes("/favorite") || pathname.includes("/bottom"))&& <Footer />}

    </div>
  );
}

export default App;
