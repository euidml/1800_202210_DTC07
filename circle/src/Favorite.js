import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from "react-router-dom";


function Favorite() {
    return (
        <div>
        <Link to="/dashboard">
        <IconButton>
        <ArrowBackIosNewIcon className='backarrow' fontSize='large' />
        </IconButton>
        </Link>
            <h1>This is the favorite page</h1>
        </div>
    );
}

export default Favorite;