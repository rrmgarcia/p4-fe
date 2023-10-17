import React from "react";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
      <div>
        <NavBar />
        <div>
          <h2>Welcome to Task24!</h2>
          <p>
            Task24 is a simple todo app created to help you plan and achieve your
            tasks for the day.
          </p>
          <h3>Stay on track, one task at a time!</h3>
          <button
            onClick={() => {
              navigate("/todo");
            }}
          >
            Click here to Get Started
          </button>
        </div>
      </div>
    );
  };
  
  export default Home;