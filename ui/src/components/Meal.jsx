import React from "react";
import dateFormat from "dateformat";

const calDates = (mealDate) => {
  let now = dateFormat(new Date(), "paddedShortDate");
  let date = dateFormat(mealDate, "paddedShortDate");
  let nowDate = new Date(now);
  let mydate = new Date(date);
  let differenceInTime = nowDate.getTime() - mydate.getTime();
  let differenceInDays = differenceInTime / (1000 * 3600 * 24);
  if (differenceInDays === 0)
    return <div className="card-footer text-muted">Today</div>;
  if (differenceInDays === 1)
    return (
      <div className="card-footer text-muted">{differenceInDays} day ago</div>
    );
  if (differenceInDays > 1)
    return (
      <div className="card-footer text-muted">{differenceInDays} days ago</div>
    );
};

const Meal = ({ meal }) => {
  return (
    <div className="card text-center mb-2 ">
      <div className="card-header">Meal on: {meal.createdAt.slice(0, 10)}</div>
      <div className="card-body">
        <h4 className="card-title"> {meal.foodName}</h4>
        <p className="card-text">{meal.calorie} Calorie</p>
        <p className="card-text">${meal.price} </p>
      </div>

      {calDates(meal.createdAt)}
    </div>
  );
};

export default Meal;
