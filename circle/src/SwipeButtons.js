import React from 'react';
import "./SwipeButtons.css";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import IconButton from "@material-ui/core/IconButton"

function SwipeButtons() {
    return(
        <div className='swipeButtons'>
            <IconButton className='swipe_left'>
            <CloseRoundedIcon fontSize='large'/>
            </IconButton>
            <IconButton className='swipe_right' >
            <CheckRoundedIcon fontSize='large'/>
            </IconButton>
        </div>
    );
}

export default SwipeButtons