import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import Meal from './components/Meal/Meal'
import MealList from "./components/MealList/MealList";
import { MealProvider } from "./components/Context/MealContext";
function App() {
  return (
    <Router>
      <Route exact path="/">
        <MealProvider>
          <MealList />
        </MealProvider>
      </Route>

    </Router>
  );
}

export default App;
