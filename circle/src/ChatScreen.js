import React, { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import './ChatScreen.css';
import { db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import sabrina from "./sabrina.jpg";

function ChatScreen() {
    const [input, setInput] = useState('');

    const [messages, setMessages] = useState([ () => 
        onSnapshot(doc(db, "messages", "name"), (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        )])
 
    const handleSend = e => {
        e.preventDefault();
        setMessages([...messages, { message: input }]);
        setInput("");
    };

    return (
    <div className='chatScreen'>
        <div className='twoicons'>
        <Link to="/dashboard/chats">
        <IconButton>
        <ArrowBackIosNewIcon className='arrow_icon' fontSize='large' />
        </IconButton>
        </Link>

       <Avatar
        
            className="#"
            src={sabrina}
            alt="sabrina" 
        />

        <Link to="/favorite">
        <IconButton>
        <FavoriteIcon className='fav_icon' fontSize='large' />
        </IconButton>
        </Link>
        </div>

        <p className='chatScreen_timestamp'>YOU MATCHED WITH SABRINA ON 10/09/20</p>
        {messages.map(message => (
            message.name ? (
            <div className='chatScreen_message'>
            <Avatar
            className='chatScreen_image'
            alt={message.name}
            src={message.image}
            />
            <p className="chatScreen_text">{message.message}</p>
            </div>
        ) : (
        <div className='chatScreen_message'>
            <p className='chatScreen_textUser'>is this working</p>
        </div>
        )
    )
    )}

    <form className='chatScreen_input'>
        <input value={input} onChange={e => setInput(e.target.value)} className="chatScreen_inputField" placeholder="Send a message" type="text" />
        <button onClick={handleSend} type="submit" className='chatScreen_inputButton'>SEND</button>
    </form>
    </div>

    );
    }
        

    export default ChatScreen;
