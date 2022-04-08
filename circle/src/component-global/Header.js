import React from "react";
import "./Header.css";
import logo from "./Circle_logo.png";
import { Link } from "react-router-dom";

// rendering header
function Header() {
  return (
    <div className="header">
      {/* Logo */}
      <Link to="/">
        <img className="header_logo" src={logo} alt="logo" />
      </Link>
    </div>
  );
}

export default Header;
