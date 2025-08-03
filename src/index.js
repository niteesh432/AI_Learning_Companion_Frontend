import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./home";
import Navbar from "./navbar";
import DownArrow from "./downarrow";
import Description from "./description";
import InputForm from "./input";
import Footer from "./footer";


function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <DownArrow />
      <Description />
      <InputForm />
      <Footer />
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
