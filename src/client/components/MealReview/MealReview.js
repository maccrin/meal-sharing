import React, { useEffect, useState } from "react";
import "./mealreview.css";
const EachMealReview = ({ meal }) => {
  const meal_id = meal.id;
  console.log(meal_id);
  const [star, setStar] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`api/meals/${meal_id}/reviews`);
        console.log(res);
        if (res.ok) {
          const result = await res.json();
          const avgStars =
            result.reduce((accu, curr) => accu + curr.stars, 0) / result.length;
          setStar(avgStars);
        }
      } catch (e) {
        return e.message;
      }
    })();
  }, [meal_id]);
  return (
    <div>
      {Array.of(1, 2, 3, 4, 5).map((eachStar) => {
        return (
          <button
            type="button"
            key={eachStar}
            className={eachStar <= star ? "on" : "off"}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
export default EachMealReview;
