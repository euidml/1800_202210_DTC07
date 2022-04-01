import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "./mainProfileCards.css";
import SwipeButtons from "./SwipeButtons";
import { auth, db } from "./firebase";
import { query, collection, getDocs, where, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function TinderCards() {
  const [user] = useAuthState(auth);
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");

  const fetchFilteredProfiles = async () => {
    try {
      const userInfo = collection(db, "UserInfo");
      const q = query(userInfo, where("PersonalInfo.sport", "in", ["Skiing"]));
      const doc = await getDocs(q);
      const data = doc.docs;
      data.map((person) => {
        console.log(person.id, person.data());
        if (person.data().personalInfo?.sport == "Hockey") {
          setPeople((prev) => [
            ...prev,
            {
              uid: person.id,
              name: person.data().name.split(" ")[0],
              url: person.data().profilePhoto.photo
            }
          ]);
        }
      });
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
      setPeople(people => [])
      data.map((person) => {
        console.log(person.id, person.data(), people);
        if (
          person.data().personalInfo?.sport == activeFilter ||
          activeFilter == ""
        ) {
          setPeople((prev) => [
            ...prev,
            {
              uid: person.id,
              name: person.data().name.split(" ")[0],
              url: person.data().profilePhoto.photo,
              sport: person.data().personalInfo?.sport
            }
          ]);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProfilePhotos();
  }, [activeFilter]);
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
        setActiveFilter={setActiveFilter}
      />
    </div>
  );
}

export default TinderCards;
