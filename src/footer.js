import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="quote">"Learning never exhausts the mind." - Leonardo da Vinci</p>
        <p>© 2025 AI Learning Companion. All rights reserved.</p>
        <p>
          Made for learners |  
          <a href="https://github.com/niteesh432" target="_blank" rel="noopener noreferrer"> GitHub</a> |  
          <a href="https://linkedin.com/veluriniteesh" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
