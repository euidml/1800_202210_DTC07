import React from 'react';
import './Header.css';
import LogoutIcon from '@mui/icons-material/Logout';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';

function Header() {
    return (
        <div className="header">
            <IconButton>
                <LogoutIcon className='header_icon' fontSize='large' />
            </IconButton>
            <img
                className="header_logo"
                src="https://upload.wikimedia.org/wikipedia/en/b/b1/Olympic_Rings.svg"
                alt="logo" />

            <IconButton>
                <FilterAltIcon className='header_icon' fontSize='large' />
            </IconButton>
        </div>
    )
}

export default Header