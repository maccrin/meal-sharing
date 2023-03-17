import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import Meal from './components/meal/meal'

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Meal />
      </Route>

    </Router>
  );
}

export default App;
