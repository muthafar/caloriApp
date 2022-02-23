import React from "react";
import Header from "../components/Header";
import MealForm from "../components/MealForm";
import MealList from "../components/MealList";

const Homepage = () => {
  return (
    <div className="container">
      <Header />
      <MealForm />
      <MealList />
    </div>
  );
};

export default Homepage;
