import React from 'react';
import './Header.css';
import LogoutIcon from '@mui/icons-material/Logout';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import { logout } from "./firebase";

import logo from "./Circlelogo_V3.png";
import { Link } from "react-router-dom";

function Header() {
    
    return (
        <div className="header">
            <Link to="/">
                <img
                    className="header_logo"
                    src={logo}
                    alt="logo" />
            </Link>

{/* 
            <IconButton>
                <FilterAltIcon className='go_away' fontSize='large' />
            </IconButton> */}
        </div>
    )
}

export default Header