import React from "react";
import { useHistory } from 'react-router-dom';
import './home.css'
// import backgroundImage from '../../assets/images/star-anise.jpg';
export default function Home() {
    const history = useHistory();
    return (
        <>
            <article className="home">
                <h1 className="title">A Comprehensive Guide to Indian Cuisine</h1>
                <>
                    <p>
                        Indian food, not unlike any other country’s national food scene, is a vast constellation of culinary influences and traditions from all over the Asian continent.
                        Traditional Indian food is built from the same flavor foundations. However, dishes vary widely between North Indian and South Indian cuisine. If you’re familiar with Indian restaurants in the D.K., you’ll likely know these popular (and tasty!) Indian dishes:</p>
                    <h3> What Are the Common Ingredients and Flavors in Indian Cuisine?</h3>
                    Besides the standard spice kit of chili peppers (dried whole and powdered), garlic, ginger, and allspice, common ingredients in Indian cooking include:
                    <h3>What Are the Different Regional Cuisines in India?</h3>
                    <p>   Simple food that packs a flavorful punch is the defining feature of Indian cuisine from region to region. That theme is informed by religion, population, and geography, though interpretations on the right way to cook something varies wildly even between neighbors. Heartier dishes similar to those found in Pakistan are found in the North, while similar flavor profiles in the South can be found throughout Southeast Asia.
                        So Here We presenting some super delicious authentic Indian cuisines from all over the town!!</p>

                </>
                <button className="homebutton" onClick={() => history.push('/meals')}>Take me to Meal Page</button>
            </article>
        </>
    )

}
