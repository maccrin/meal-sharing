import React from "react";
import { Link } from "react-router-dom";
import "./navigation.css";
const Navigation = () => {
  return (
    <div className="sticky">
      <ul className="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/meals">Meals</Link>
        </li>
        <li>
          <Link to="/Review">Reviews</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
