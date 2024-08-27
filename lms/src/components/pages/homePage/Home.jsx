import React from "react";
import './Home.css'
import Login2 from "../login/Login2";
// import Navbar from "../../shared/navbar/Navbar";

const Home = () => {
  return (
    <div className="home-parent">
      <div className="home-container">
        <Login2 />
      </div>
    </div>
  );
};

export default Home;
