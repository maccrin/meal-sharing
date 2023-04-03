import React from "react";
import { useHistory } from 'react-router-dom';
import './home.css'
export default function Home() {
    const history = useHistory();
    return (
        <div className="homecontainer" >
            <article className="home">
                <h1 className="heading">Spice a dish with love and it pleases every palate ~ Plautus</h1>
                <p className="text">
                    Indian food, not unlike any other country’s national food scene, is a vast constellation of culinary influences and traditions from
                    all over the Asian continent.
                    Traditional Indian food is built from the same flavor foundations.</p>
                <p className="text">  Besides the standard spice kit of chili peppers (dried whole and powdered), garlic, ginger, and allspice, common ingredients in Indian cooking include:
                    Simple food that packs a flavorful punch is the defining feature of Indian cuisine from region to region.</p>
                <p className="text"> That theme is informed by religion, population, and geography, though interpretations on the right way to cook something varies wildly even between neighbors. Heartier dishes similar to those found in Pakistan are found in the North,
                    while similar flavor profiles in the South can be found throughout Southeast Asia.
                    So Here We presenting some super delicious authentic Indian cuisines from all over the town!!</p>
            </article>

            <button className="homebutton" onClick={() => history.push('/meals')}>Go To Meal Page</button>

        </div>
    )

}
