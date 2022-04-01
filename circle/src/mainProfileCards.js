import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "./mainProfileCards.css";
import SwipeButtons from "./SwipeButtons";
import { auth, db } from "./firebase";
import { query, collection, getDocs, where, getDoc } from "firebase/firestore";

function TinderCards() {
  const [people, setPeople] = useState([
  ]);
  const [filter, setFilter] = useState([]);

  // const [activeFilter, setActiveFilter] = useState('all');

  const fetchFilteredProfiles = async () => {
    try {
      const userInfo = collection(db, "UserInfo");
      const q = query(userInfo, where("PersonalInfo.sport", "in", ["Skiing"]));
      const doc = await getDocs(q);
      const data = doc.docs;
      data.map((person) => {
        setFilter(
          (prev) => [
            ...prev,
            {
              name: person.data().name.split(" ")[0],
              url: person.data().profilePhoto.photo
            }
          ]
        );
      })
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchFilteredProfiles();
  },[]);

  const fetchProfilePhotos = async () => {
    try {
      const userInfo = collection(db, "UserInfo");
      const q = query(userInfo, where("profilePhoto.availability", "==", true));
      const doc = await getDocs(q);
      const data = doc.docs;
      data.map((people)=>{
        if(people.data().personalInfo.sport == "Hockey"){
          setPeople(
            (prev) => [
              ...prev,
              {
                name: people.data().name.split(" ")[0],
                url: people.data().profilePhoto.photo
              }
            ]
          );
        }})
      // data.map((person)=>{
      //   setPeople(
          // (prev) => [
          //   ...prev,
          //   {
          //     name: person.data().name.split(" ")[0],
          //     url: person.data().profilePhoto.photo
          //   }
      //     ]
      //   );
      // });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProfilePhotos();
  },[]);
  return (
    <div>
      <div className="tinderCards_cardContainers">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            // line below disables swip up and down. Might have to delete later
            preventSwipe={["down"]}
            flickOnSwipe={[false]}
          >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="card"
            >
            <div className="text_background_box">
              <h3>{person.name}</h3>
             </div> 
            </div>
          </TinderCard>
        ))}
      </div>
      <SwipeButtons 
      // people={people} 
      // setFilter={setFilter} 
      // activeFilter={activeFilter} 
      // setActiveFilter={setActiveFilter}
      />
    </div>
  );
}

export default TinderCards;
