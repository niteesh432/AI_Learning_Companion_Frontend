import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fade-in">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link fs-5 px-3 text-warning fade-in" href="/input">Summarize</a></li>
            <li className="nav-item"><a className="nav-link fs-5 px-3 text-warning fade-in" href="/quiz">Quizzes</a></li>
            <li className="nav-item"><a className="nav-link fs-5 px-3 text-warning fade-in" href="/tts">Text-to-Speech</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
