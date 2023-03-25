import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home/Home'
import ErrorPage from './components/ErrorPage'
import Reservation from './components/Reservation/Reservation'
import Review from './components/Review/Review'
import Meal from './components/Meal/Meal'
import MealList from "./components/MealList/MealList";
import { MealProvider } from "./components/Context/MealContext";
import Navigation from "./components/Navigation/Navigation"
import Footer from "./components/Footer/Footer";
import MealReview from "./components/ReviewPage/ReviewPg"

export default function App() {
  return (
    < MealProvider >
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
            <Route exact path="/Review">
              <MealReview />
            </Route>
            <Route exact path="/meals/:id">
              <Meal />
            </Route>
            <Route exact path="/reservations/:id/:available_slot">
              <Reservation />
            </Route>
            <Route exact path="/review/:id">
              <Review />
            </Route>

            <Route component={ErrorPage}>
              <ErrorPage />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div >
    </MealProvider>
  );
}






