import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home/Home'
import ErrorPage from './components/ErrorPage'
import Reservation from './components/Reservation/Reservation'
import Review from './components/Review/Review'
import Meal from './components/Meal/Meal'
import MealList from "./components/MealList/MealList";
import { MealProvider } from "./components/Context/MealContext";

export default function App() {
  return (
    < MealProvider >
      <div>
        <Router>
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
        </Router>
      </div >
    </MealProvider>
  );
}






