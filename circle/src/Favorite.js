import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from "react-router-dom";
import './Favorite.css';



function Favorite() {
    return (
        <div>
        <Link to="/dashboard">
        <IconButton>
        <ArrowBackIosNewIcon className='backarrow' fontSize='large' />
        </IconButton>
        </Link>
        
        <h2>💛 You favorited 3 people</h2>
        <div className='img_container'>
            <div className='images'>
                <img src='https://i.pinimg.com/736x/bc/84/80/bc8480ce0718c4d84576606c64d73da6--twilight-saga-new-moon-twilight-movie.jpg' alt='ed'></img>
            </div>

            <div className='images'>
                <img src='https://media1.popsugar-assets.com/files/thumbor/KOb-u-ocyOE0Mw27W17OZN1QOSQ/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2016/03/18/896/n/1922398/1385d1ed_edit_img_image_36158137_1416727436_JMomoa/i/Jason-Momoa.jpg' alt='jason'></img>
            </div>

            <div className='images'>
                <img src='https://friendlystock.com/wp-content/uploads/2020/04/6-mexican-chicken-cartoon-clipart.jpg' alt='run'></img>
            </div>

            
        </div>
        </div>
    );
}

export default Favorite;