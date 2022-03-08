import React from 'react';
import './Header.css';
import LogoutIcon from '@mui/icons-material/Logout';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import {logout} from "./firebase";
import logo from "./Circle.png";

function Header() {
    return (
        <div className="header" >
            <img
                className="header_logo"
                src={logo}
                alt="logo" />

            <IconButton>
                <FilterAltIcon className='header_icon' fontSize='large' />
            </IconButton>
        </div>
    )
}

export default Header