import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div
      className="home-container fade-in"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/landing_page_image_ai_learning_companion.jpg)`,
      }}
    >
      <div className="overlay fade-in">
        <h1 className="fade-out fw-bold">AI Learning Companion</h1>
        <p className="fade-out pt-4">"Empowering learning with AI – Summarize, Quiz, and Learn!"</p>
      </div>
    </div>
  );
};

export default Home;