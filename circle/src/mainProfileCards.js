import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import './mainProfileCards.css';


function TinderCards() {
    const [people, setPeople] = useState([
        {
            name: 'Jason',
            url: 'https://media1.popsugar-assets.com/files/thumbor/KOb-u-ocyOE0Mw27W17OZN1QOSQ/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2016/03/18/896/n/1922398/1385d1ed_edit_img_image_36158137_1416727436_JMomoa/i/Jason-Momoa.jpg'
        },
        {
            name: 'Edward',
            url: 'https://i.pinimg.com/736x/bc/84/80/bc8480ce0718c4d84576606c64d73da6--twilight-saga-new-moon-twilight-movie.jpg'
        }
    ]);

    return (
        <div>
            <h1> Dating Cards </h1>

            <div className="tinderCards_cardContainers">
                {people.map(person => (
                    <TinderCard
                        className="swipe"
                        key={person.name}
                        // line below disables swip up and down. Might have to delete later
                        preventSwipe={['up', 'down']}
                    >
                        <div
                            style={{ backgroundImage: `url(${person.url})` }}
                            className="card"
                        >

                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default TinderCards