import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className="home">
        <div className="home-content">
          <h1>Welcome to the Learn2PLay Platform</h1>
          <p>Your journey to learning, growth, and success begins here.</p>
          <button
            className="common-btn"
            onClick={() => navigate("/courses")}
          >
            Get Started
          </button>
        </div>
      </section>

      <Testimonials />
    </div>
  );
};

export default Home;
