import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import './ChatScreen.css';
import { db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';


function ChatScreen() {
    const [input, setInput] = useState('');

    // const [messages, setMessages] = onSnapshot(doc(db, "messages", "message"), (messageDoc) => {
    //     console.log("messages", messageDoc.data());
    // })


    const [messages, setMessages] = useState([
        {
            name: 'Sabrina',
            image: 'https://i2-prod.mirror.co.uk/incoming/article11167826.ece/ALTERNATES/n310p/0_Thylane-Blondeau.jpg',
            message: 'whats up 😁'
        }, {
            name: 'Sabrina',
            image: 'https://i2-prod.mirror.co.uk/incoming/article11167826.ece/ALTERNATES/n310p/0_Thylane-Blondeau.jpg',
            message: 'heyyy'
        }, {

            message: 'whats up Sabrina😍'
        },

    ]);

    const handleSend = e => {
        e.preventDefault();
        setMessages([...messages, { message: input }]);
        setInput("");
    };

    return (
    <div className='chatScreen'>
        
        <Link to="/dashboard/chats">
        <IconButton>
        <ArrowBackIosNewIcon className='header_icon' fontSize='large' />
        </IconButton>
        </Link>

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
            <p className='chatScreen_textUser'>{message.message}</p>
        </div>
        )
    )
    )}

    <form className='chatScreen_input'>
        <input value={input} onChange={e => setInput(e.target.value)} className="chatScreen_inputField" placeholder="say hello" type="text" />
        <button onClick={handleSend} type="submit" className='chatScreen_inputButton'>SEND</button>
    </form>
    </div>

    );
    }
        

    export default ChatScreen;
