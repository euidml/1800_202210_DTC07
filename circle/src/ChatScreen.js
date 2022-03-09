import React, {useState} from 'react';
import { Avatar } from '@material-ui/core';
import './ChatScreen.css';


function ChatScreen() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            name: 'Ellen',
            image: 'https://i.pinimg.com/736x/10/86/f1/1086f1a42926178290008c39cf470715.jpg',
            message: 'whats up 😁'
        }, {
            name: 'Ellen',
            image: 'https://i.pinimg.com/736x/10/86/f1/1086f1a42926178290008c39cf470715.jpg',
            message: 'heyyy'
        }, {

            message: 'whats up 😁'
        },

    ]);

    const handleSend = e => {
        e.preventDefault();
        setMessages([...messages, { message: input }]);
        setInput("");
    };

    return (
    <div className='chatScreen'>
        <p className='chatScreen_timestamp'>YOU MATCHED WITH ELLEN ON 10/09/20</p>
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
            <p className='chatScreen_textUser'></p>
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
