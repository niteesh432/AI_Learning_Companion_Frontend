import React, { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import loadingAnimation from "./animations/loading.json";
import { db } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./quizGeneration.css";

const QuizGeneration = ({ summary, onResetSummary }) => {
  const [quizData, setQuizData] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      localStorage.removeItem("userQuizAnswers");
    };
  }, []);

  const generateQuiz = async () => {
    if (!summary) {
      alert("⚠️ Please summarize text first!");
      return;
    }

    setLoading(true);
    setSubmitted(false);
    setQuizData([]);
    setUserAnswers({});
    localStorage.removeItem("userQuizAnswers");

    try {
      const response = await axios.post(
        `https://ai-learning-companion-backend.onrender.com/generate-quiz`,
        { text: summary }
      );



      const quiz = response.data.quiz;
      if (Array.isArray(quiz)) {
        setQuizData(quiz);
      } else {
        alert("❌ Failed to generate a valid quiz.");
      }
    } catch (error) {
      alert("❌ Error: Unable to generate quiz. Try again.");
      console.error("FastAPI Quiz Error:", error);
    }

    setLoading(false);
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
  const score = getScore();
  const total = quizData.length;
  const percentage = total > 0 ? (score / total) * 100 : 0;

  localStorage.setItem("userQuizAnswers", JSON.stringify(userAnswers));
  setSubmitted(true);

  const attemptData = {
    userId: "guest", 
    score,
    total,
    percentage, 
    summary,
    timestamp: serverTimestamp(),
  };

  try {
    await addDoc(collection(db, "quizAttempts"), attemptData);
  } catch (error) {
    console.error("❌ Error storing quiz attempt:", error);
  }
};


  const handleRetry = () => {
    setSubmitted(false);
    setUserAnswers({});
    localStorage.removeItem("userQuizAnswers");
  };

  const handleFullReset = () => {
    setSubmitted(false);
    setQuizData([]);
    setUserAnswers({});
    localStorage.removeItem("userQuizAnswers");
    onResetSummary?.();
  };

  const getScore = () => {
    return quizData.reduce((score, q) => {
      return userAnswers[q.id] === q.answer ? score + 1 : score;
    }, 0);
  };

  const getFeedback = (score, total) => {
    const percent = (score / total) * 100;
    if (percent >= 80) return "🎉 Well Prepared!";
    if (percent >= 50) return "📘 Good, but can Improve.";
    return "🚧 Needs Improvement.";
  };

  const score = getScore();
  const percentage = quizData.length > 0 ? (score / quizData.length) * 100 : 0;

  return (
    <div className="quiz-container">
      <button onClick={generateQuiz} disabled={loading}>
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      {loading && (
        <div className="lottie-container">
          <Lottie animationData={loadingAnimation} loop autoplay style={{ width: 120, height: 120 }} />
        </div>
      )}

      {!loading && quizData.length > 0 && (
        <div className="quiz-box">
          {quizData.map((q) => (
            <div key={q.id} className="question-block">
              <div className="question">{q.question}</div>
              <div className="options-container">
                {q.options.map((option, idx) => {
                  const isSelected = userAnswers[q.id] === option;
                  const isCorrect = option === q.answer;
                  const showResult = submitted;

                  let optionClass = "option";
                  if (showResult) {
                    if (isCorrect) optionClass += " correct";
                    else if (isSelected && !isCorrect) optionClass += " incorrect";
                  } else if (isSelected) {
                    optionClass += " selected";
                  }

                  return (
                    <label key={idx} className={optionClass}>
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={option}
                        checked={isSelected}
                        disabled={submitted}
                        onChange={() => handleAnswerChange(q.id, option)}
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(userAnswers).length !== quizData.length}
            >
              Submit
            </button>
          ) : (
            <div className="result-box">
              <p>Score: {score} / {quizData.length}</p>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
              </div>
              <p>{getFeedback(score, quizData.length)}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
                <button onClick={handleRetry}>Try Quiz Again</button>
                <button onClick={handleFullReset}>Reset Summary & Quiz</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizGeneration;
