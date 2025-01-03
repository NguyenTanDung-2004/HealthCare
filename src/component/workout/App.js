import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../../css/workout/App.css";
import NavigationBar from "../navigationBar/NavigationBar";
import Main from "./Main";

const App = () => {
  return (
    <>
      <div className="workout">
        <Header
          username="Phan Giang"
          text="May this website help you achieve your health goals."
          notifications={10}
        ></Header>

        <NavigationBar itemClicked="Workout"></NavigationBar>

        <Main />
      </div>

      <Footer></Footer>
    </>
  );
};

export default App;
