import React, {useState} from 'react'
import "./SettingProfileCard.css"
import { useAuth } from "./firebase"

function SettingProfileCard() {

    const currentUser = useAuth();

    const [name,setName] = useState('Your Name');

    console.log(currentUser)
    return(

        <div className='Card'>
            <div className='upper'>
                <div className='image'>
                    <img className="profile_img" src="https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png" alt='' height="100px" width="100px"/>
                </div>
            </div>
            <div className="lower">
                <h3>{ currentUser?.name }</h3>
            </div>

        </div>
    )
}

export default SettingProfileCard