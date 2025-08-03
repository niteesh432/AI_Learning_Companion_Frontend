import React, { useEffect } from "react";
import "./downArrow.css";

function DownArrow() {
  useEffect(() => {
    // Get the down arrow element
    const downArrow = document.querySelector('.downarrow');

    // Add an event listener to handle the scroll event
    const handleScroll = () => {
      const threshold = window.innerHeight / 12;
      if (window.scrollY > threshold) {
        downArrow.classList.add('hidden'); // Add the hidden class to fade out
      } else {
        downArrow.classList.remove('hidden'); // Remove the hidden class to fade in
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="downarrow">
      <img src={process.env.PUBLIC_URL + "/downarrow.png"} alt="downarrow" />
    </div>
  );
}

export default DownArrow;