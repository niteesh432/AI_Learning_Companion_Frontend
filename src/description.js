import React, { useEffect } from "react";
import "./description.css";

function Description() {
  useEffect(() => {
    const descriptionPart = document.getElementById("description-part");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.07,
      }
    );

    if (descriptionPart) {
      observer.observe(descriptionPart);
    }

    return () => {
      if (descriptionPart) {
        observer.unobserve(descriptionPart);
      }
    };
  }, []);

  return (
    <section className="description container rounded-5" id="description-part">
      <div className="image-content">
        <img src={process.env.PUBLIC_URL + "/description_image_ai_learning_companion.jpg"} alt="AI Learning Companion Features" />
      </div>
      <div className="text-content">
        <h2>AI Learning Companion - Your Smart Study Partner</h2>
        <p>
          The AI Learning Companion offers a range of intelligent features to enhance your study experience. It provides AI-powered text summarization, allowing you to instantly generate concise summaries from lengthy study materials. With quiz generation, you can transform study content into interactive quizzes to test your knowledge effectively. The text-to-speech (TTS) feature enables AI-generated voice assistance, allowing you to listen to summarized content for better understanding. Additionally, the platform is designed with a user-friendly interface, built using ReactJS and Bootstrap, ensuring a smooth and intuitive learning experience.
        </p>
        <p><strong>Get started today and enhance your learning process with AI!</strong></p>
      </div>
    </section>
  );
}

export default Description;