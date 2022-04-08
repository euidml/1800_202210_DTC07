import React from "react";
import "./App.css";
import Login from "../component-login/login.js";
import UserRegister from "../component-login/Register.js";
import ResetUserPassword from "../component-login/Reset.js";
import Header from "./Header.js";
import Dashboard from "../component-main/main";
import Chats from "../component-chat/Chats";
import ChatScreen from "../component-chat/ChatScreen";
import ProfilePage from "../component-setting/Profilepage";
import Favorite from "../component-liked/Favorite";
import Footer from "./footer";
import Settingpage from "../component-setting/Settingpage";
import { Route, Routes, useLocation } from "react-router-dom";

// A function that is technically "root" of the app.
function App() {
  // to control the appearance of header and footer, we used url for each page.
  const pathname = useLocation().pathname;
  //rendering "/"
  return (
    <div className="app">
      {/* controlling header depends on its url */}
      {pathname.includes("/dashboard") && <Header />}
      {/* return different components depends on the url called. */}
      <Routes>
        {console.log(useLocation())}
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<UserRegister />} />
        <Route exact path="/resetpassword" element={<ResetUserPassword />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/dashboard/chats" element={<Chats />} />
        <Route
          exact
          path="/chat/:chatRoomId"
          element={<ChatScreen chatRoomId={pathname.split("chat/")[1]} />}
        />
        <Route exact path="/dashboard/profile" element={<ProfilePage />} />
        <Route exact path="/bottom/settingpage" element={<Settingpage />} />
        <Route exact path="favorite" element={<Favorite />} />
      </Routes>
      {/* controlling footer depends on its url */}
      {(pathname.includes("/favorite") ||
        pathname.includes("/dashboard") ||
        pathname.includes("/bottom")) && <Footer />}
    </div>
  );
}

export default App;
