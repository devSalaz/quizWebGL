import React from "react";
import useQuizStore, { QUIZ_STAGES } from "../store/quizStore";
import { quizzes } from "../data/dataQuiz";

//Styles
import "../assets/Styles/selectingQuizStyles.css";

const SelectingQuiz = () => {
  const setStage = useQuizStore((state) => state.setStage);
  const setQuizId = useQuizStore((state) => state.setQuizId);

  function setNextStage() {
    setStage(QUIZ_STAGES.GENERAL_INTRO);
  }

  function selectQuiz(id) {
    setQuizId(id);
    setStage(QUIZ_STAGES.QUIZ_SPECIFIC_INTRO);
  }

  return (
    <div className="selecting-quiz-container">
      <p>Select a quiz</p>
      <div className="cards-container">
        {quizzes.map((quiz, index) => (
          <QuizCard
            key={quiz.name}
            quizData={quiz}
            index={index}
            selectQuiz={selectQuiz}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectingQuiz;

const QuizCard = ({ quizData, index, selectQuiz }) => {
  return (
    <div
      className="quiz-card"
      onClick={() => {
        selectQuiz(index);
      }}
    >
      <img
        src={`/assets/images/${quizData.sku}.jpg`}
        className="background-card"
      ></img>
      <h4>{quizData.name}</h4>
      <button>Start</button>
    </div>
  );
};
