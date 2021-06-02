import React, { useState } from 'react';
import { useEffect } from "react";
import './TinderCards.css';
import TinderCard from 'react-tinder-card';
import axios from './axios.js';

function TinderCards() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get("/tinder/cards");
            setPeople(req.data);
        }
        fetchData();
    }, [])

    const swiped = (direction, nameToDelete) => {
        console.log("Removing: " , nameToDelete);
    }

    const outOfFrame = (name) => {
        console.log(name, " left the screen!");
    }

    return (
        <div className="tinderCards">
            <div className="tinderCards_cardContainer">
                {people.map((person) => {
                    return (<TinderCard
                        className="swipe"
                        key={person.name}
                        onSwipe={(dir) => swiped(dir, person.name)} 
                        onCardLeftScreen={() => outOfFrame(person.name)} 
                        preventSwipe={['up', 'down']}>
                            <div 
                            className="card"
                            style={{backgroundImage: `url(${person.imgUrl})`}}>
                                <h3>{person.name}</h3>
                            </div>    
                    </TinderCard>)
                })}
            </div>
        </div>
    )
}

export default TinderCards
