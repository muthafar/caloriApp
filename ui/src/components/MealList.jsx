import React from "react";
import { useEffect } from "react";
import { fetchFoodList } from "../redux/features/food/foodSlice";
import { useDispatch, useSelector } from "react-redux";

import Meal from "./Meal";

const MealList = () => {
  const dispatch = useDispatch();

  const { foodList, filteredFoodList, sumCal } = useSelector(
    (state) => state.food
  );
  const filter = filteredFoodList.length === 0 ? foodList : filteredFoodList;
  useEffect(() => {
    dispatch(fetchFoodList());
  }, [dispatch]);

  return (
    <>
      {sumCal >= 2100 ? (
        <div class="alert alert-danger" role="alert">
          you have react calories limit for this day
        </div>
      ) : null}
      <div className="row">
        {filter.map((meal) => (
          <div key={meal._id} className="col-md-6 col-lg-4 col-xl-3">
            <Meal meal={meal} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MealList;
