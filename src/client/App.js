import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './components/Home/Home'
import ErrorPage from './components/ErrorPage'
import MealSort from "./components/MealSort/MealSort"
import Reservation from './components/Reservation/Reservation'
import Review from './components/Review/Review'
import Meal from './components/Meal/Meal'
import MealList from "./components/MealList/MealList";
import { MealProvider } from "./components/Context/MealContext";
import { SortedMealProvider } from "./components/Context/MealSortContext"
import Navigation from "./components/Navigation/Navigation"
import Footer from "./components/Footer/Footer";
import MealReview from "./components/ReviewPage/ReviewPg"

import TestComponent from "./components/TestComponent/TestComponent";
import Meal from './components/meal/meal'


export default function App() {
  return (

    < MealProvider >
      <SortedMealProvider>
        <div>
          <Router>
            <Navigation />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/meals">
                <MealList />
              </Route>
              <Route exact path="/meals/:id">
                <Meal />
              </Route>
              <Route exact path="/reservations/:id">
                <Reservation />
              </Route>
              <Route exact path="/review/:id">
                <Review />
              </Route>
              <Route exact path="/Review">
                <MealReview />
              </Route>
              <Route >
                <ErrorPage />
              </Route>
              <Route >
                <MealSort />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </div >
      </SortedMealProvider>
    </MealProvider>

    <Router>
      <Route exact path="/">
        <Meal />
      </Route>

    </Router>

  );
}






