import React from "react";
import HealthCardImg from "../../img/home_out/health.png";
import DietCardImg from "../../img/home_out/diet.png";
import WorkoutCardImg from "../../img/home_out/workout.png";
import ServiceCard from "./ServiceCard";
import "../../css/home_out/Main2.css";

const Main2 = () => {
  return (
    <div id="main2">
      <span className="main2-title">Our Services</span>
      <div className="card-list">
        <ServiceCard
          image={HealthCardImg}
          title="Health Tracking"
          desc="Track your fitness journey with our user-friendly health tracker."
        ></ServiceCard>
        <ServiceCard
          image={DietCardImg}
          title="Personalized Nutrition Plans"
          desc="Discover delicious and nutritious recipes to support your health goals."
        ></ServiceCard>
        <ServiceCard
          image={WorkoutCardImg}
          title="Home Workout Routines"
          desc="Get fit from the comfort of your home with our effective workout plans."
        ></ServiceCard>
      </div>
    </div>
  );
};

export default Main2;
