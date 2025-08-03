import React, { useState } from "react";
import axios from "axios";
import { MdOutlineTextSnippet } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import Lottie from "lottie-react";
import QuizGeneration from "./quizGeneration";
import "./input.css";

// Lottie animations
import successAnimation from "./animations/success.json";
import copyAnimation from "./animations/copy.json";
import listenAnimation from "./animations/listen.json";
import stopAnimation from "./animations/stop.json";
import loadingAnimation from "./animations/loading.json";

const InputForm = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [played, setPlayed] = useState(false);
  const [stopped, setStopped] = useState(false);

  const summarizeText = async (text) => {
    setLoading(true);
    setShowSuccess(false);
    setSummary("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/summarize`,
        { text }
      );


      setSummary(response.data.summary || "❌ Failed to get summary");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("FastAPI Summary Error:", error);
      setSummary("❌ Error: Unable to summarize. Try again later.");
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setSummary("⚠️ Please enter some text to summarize.");
      return;
    }
    await summarizeText(text);
  };

  const handleSpeak = () => {
    if (!summary) return;
    const speech = new SpeechSynthesisUtterance(summary);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    speechSynthesis.speak(speech);
    setPlayed(true);
    setTimeout(() => setPlayed(false), 2000);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setStopped(true);
    setTimeout(() => setStopped(false), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  const renderAnimatedSentences = (text) => {
  if (!text) return null;

  // Split based on sentence endings or new lines with points
  const lines = text.split(/\n|(?<=[.!?])\s+(?=\d+\.|\*|-|•)/g);

  return lines.map((line, index) => {

    return (
      <div
        key={index}
        className="sentence-fade"
        style={{
          animationDelay: `${index * 0.2}s`,
          display: "block",
          marginBottom: "6px",
          fontSize: "1rem",
        }}
      >
        {line.trim()}
      </div>
    );
  });
};




  return (
    <div className="container mt-4 input-form">
      <h2>Enter your text here to Summarize</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="10"
            placeholder="Paste your study material here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="d-flex">
          <button type="submit" className="btn btn-success summary-btn">
            Summarize
          </button>
        </div>
      </form>

      {loading && (
        <div className="loading-animation d-flex flex-column align-items-center">
          <Lottie animationData={loadingAnimation} style={{ height: 100 }} />
          <p className="mt-2">Summarizing your content...</p>
        </div>
      )}

      {!loading && summary === "" && (
        <div className="placeholder-box">
          <MdOutlineTextSnippet />
          <p>Your summary will appear here</p>
        </div>
      )}

      {summary && !loading && (
        <div className="summary-box">
          <h3>Summarized Text</h3>

          {showSuccess && (
            <Lottie animationData={successAnimation} loop={false} style={{ height: 100 }} />
          )}

          <p>{renderAnimatedSentences(summary)}</p>

          <div className="button-group mt-3">
            <button className="btn btn-outline-primary" onClick={handleSpeak}>
              {played ? (
                <Lottie animationData={listenAnimation} loop={false} style={{ height: 40 }} />
              ) : (
                <>🎤 <b>Listen</b></>
              )}
            </button>

            <button className="btn btn-outline-danger" onClick={handleStop}>
              {stopped ? (
                <Lottie animationData={stopAnimation} loop={false} style={{ height: 40 }} />
              ) : (
                <>⏹ <b>Stop</b></>
              )}
            </button>

            <button className="btn btn-outline-secondary" onClick={handleCopy}>
              {copied ? (
                <Lottie animationData={copyAnimation} loop={false} style={{ height: 40 }} />
              ) : (
                <>
                  <FaRegCopy /> <b>Copy</b>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <QuizGeneration summary={summary} onResetSummary={() => setSummary("")} />
    </div>
  );
};

export default InputForm;
