import React, { useState} from 'react'
import { db, auth } from './firebase'
import {Input, Button} from '@material-ui/core'
import firebase from 'firebase'


function SendMessage() {
    const [msg, setMsg] = useState('')
  
    async function sendMessage(e){
        e.preventDefault()
        const {uid, photoURL} = auth.currentUser
        await db.collection('messages').add({
            text: msg,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
    }
    return (
    <div>
        <form onSubmit={sendMessage}>
            <Input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Message..."/>
            <Button type="submit">Send</Button>
        </form>
    </div>
  )
}

export default SendMessage