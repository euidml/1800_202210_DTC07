import React, { useEffect, useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import "./mainProfileCards.css";
import SwipeButtons from "./SwipeButtons";
import { auth, db } from "../component-global/firebase";
import { query, collection, getDocs, where, arrayUnion, updateDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

// function for swiping cards component.
// we uses TinderCard components.
function TinderCards() {
  // declaring data used in this 
  const [user] = useAuthState(auth);
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");
  const [currentIndex, setCurrentIndex] = useState(people.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const [rightSwipeIndex, setRightSwipeIndex] = useState();
  // fetch data for photo cards.
  const fetchProfilePhotos = async () => {
    try {
      // get data from db
      const userInfo = collection(db, "UserInfo");
      const q = query(userInfo, where("profilePhoto.availability", "==", true));
      const doc = await getDocs(q);
      const data = doc.docs;
      setPeople((people) => []);
      // populated data
      data.map((person) => {
        console.log(person.id, person.data(), people);
        // filetering data by sports or not filtering.
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

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);
  console.log(currentIndex, currentIndexRef);

  const childRefs = useMemo(
    () =>
      Array(people.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < people.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    if(direction==="right"){
      updateDoc(doc(db, "UserInfo", user?.uid),{
        likedPeople: arrayUnion(people[index].uid)
      }
      )
    }
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    setRightSwipeIndex(idx);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < people.length) {
      await childRefs[currentIndex]?.current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  useEffect(() => {
    fetchProfilePhotos();
  }, [activeFilter]);

  // render swiping card components
  return (
    <div>
      <div className="tinderCards_cardContainers">
        {/* populating filtered cards */}
        {people.map((person, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={person.uid}
            // preventSwipe disables swip up and downr
            preventSwipe={["down", "up"]}
            flickOnSwipe={[false]}
            onSwipe={(dir) => swiped(dir, person.name, index)}
            onCardLeftScreen={() => outOfFrame(person.name, index)}
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
      {/* redering conatins filter and showing direction cards*/}
      <SwipeButtons setActiveFilter={setActiveFilter} swipe={swipe} />
    </div>
  );
}

export default TinderCards;
