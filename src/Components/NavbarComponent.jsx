import React, { useState } from "react";
import useQuizStore, { QUIZ_STAGES } from "../store/quizStore";

//Styles
import "../assets/Styles/navbarStyles.css";

const NavbarComponent = () => {
  const currentQuiz = useQuizStore((state) => state.currentQuiz);
  const currentStage = useQuizStore((state) => state.currentStage);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = (event) => {
    setIsDarkMode(event.target.checked);
    // You can add logic here to apply the dark mode class to the body or a relevant container
    document.body.classList.toggle("dark-mode", event.target.checked);
  };

  function getQuizName() {
    if (!currentQuiz) {
      return "";
    }

    return currentQuiz.name;
  }

  const enableShadow =
    currentStage === QUIZ_STAGES.QUIZ ||
    currentStage === QUIZ_STAGES.RESULTS ||
    currentStage === QUIZ_STAGES.QUIZ_SPECIFIC_INTRO;

  return (
    <nav className={`${enableShadow ? "shadow" : ""}`}>
      <div className="content">
        <h4>DEVSALAZ</h4>
        <h4 className="quiz-name">{getQuizName()}</h4>
        <div className="mode-toggle">
          <input type="checkbox" checked={isDarkMode} onChange={handleToggle} />
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
