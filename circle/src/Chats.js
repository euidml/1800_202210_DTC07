import React from 'react';
import './Chats.css';
import Chat from "./Chat";

function Chats() {
    return (
      <div className='chats'>
          <Chat
            name="Sabrina"
            message="Yo what's up!"
            timestamp="40 seconds ago"
            profilePic="https://i2-prod.mirror.co.uk/incoming/article11167826.ece/ALTERNATES/n310p/0_Thylane-Blondeau.jpg"
            />
      

          <Chat
          name="Jessica"
          message="Hey you up"
          timestamp="30 seconds ago"
          profilePic="https://i.pinimg.com/736x/0d/74/08/0d7408886db088edf667f52c7a06caca.jpg"
          />

          <Chat
          name="DannyBoy"
          message="Did you forget about me?"
          timestamp="40 seconds ago"
          profilePic="https://i.pinimg.com/474x/fe/e7/95/fee7955fc64ea5956e8619d5061192bd--pretty-men-pretty-boys.jpg"
          />
         
          
      </div>
    );
}

export default Chats;