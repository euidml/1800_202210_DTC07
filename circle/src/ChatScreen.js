import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from '@material-ui/core';
import './ChatScreen.css';
import { db } from './firebase';
import { doc, onSnapshot, Timestamp, addDoc, query, collection} from 'firebase/firestore';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import sabrina from "./sabrina.jpg";
import useId from '@mui/material/utils/useId';


function ChatScreen() {
    const [input, setInput] = useState('');

    const [messages, setMessages] = useState([ () => 
        onSnapshot(doc(db, "messages", "text"), (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        )])
    
    useEffect(() => {
        const q = query(collection(db, "messages"))
        onSnapshot(q, (querySnapshot) => {
            const messages =[]
            querySnapshot.forEach((doc) => {
                messages.push({id: doc.id, data: doc.data() })
            })

            setMessages(messages)
        });
        }, [])
 
     
    const handleSend = async e => {
        e.preventDefault();

        await addDoc(collection(db, "messages"), {
            msg: input,
            name: 'run',
            createdAt: Timestamp.fromDate(new Date())
        })
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
        
            className="ChatScreenAvatar"
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
            <p className='chatScreen_textUser'>{input}</p>
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
