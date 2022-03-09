import React, { useState } from "react";
import "../src/Profilepage.css";
import { db } from "./firebase"

const Profileform = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [sport, setSport] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [game, setGame] = useState("");

    const [loader, setLoader] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);

        db.collection('UserInfo').add({
            name:name,
            age:age,
            gender:gender,
            sport:sport,
            hobbies:hobbies,
            game: game,
        })
        .then(() => {
            alert('Information Successfully Saved!')
            setLoader(false);
        })
        .catch(error => {
            alert(error.message);
            setLoader(false);
        });

    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h1> Profile Information </h1>

            <label> Name </label>
            <input placeholder='Name' 
            value={name} onChange={(e) => setName(e.target.value)}
            />

            <label> Age </label>
            <input placeholder='Age' 
            value={age} onChange={(e) => setAge(e.target.value)}
            />

            <label> Gender </label>
            <input placeholder='Gender' 
            value={gender} onChange={(e) => setGender(e.target.value)}
            />

            <label> Main sport </label>
            <input placeholder='Sport' 
            value={sport} onChange={(e) => setSport(e.target.value)}
            />

            <label> Hobbies </label>
            <input placeholder='Hobbies' 
            value={hobbies} onChange={(e) => setHobbies(e.target.value)}
            />

            <label> Two Truths, One Lie </label>
            <textarea placeholder='Game'
            value={game} onChange={(e) => setGame(e.target.value)}
            > </textarea>

            <button type='submit' style={{background: loader ? "#ccc" : "rgb(2, 2, 110)" }}> Submit </button>
        </form>
    )
}

export default Profileform