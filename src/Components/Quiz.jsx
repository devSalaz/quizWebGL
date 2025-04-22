import React, { useRef, useEffect } from "react";
import useQuizStore, { QUIZ_STAGES } from "../store/quizStore";
import gsap from "gsap";

//Styles
import "../assets/Styles/quizStyles.css";

const Quiz = () => {
  const questions = useQuizStore((state) => state.currentQuestions);
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionId);
  const setCurrentQuestion = useQuizStore((state) => state.setCurrentQuestion);
  const setStage = useQuizStore((state) => state.setStage);

  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestion(currentQuestionIndex + 1);
    } else {
      setStage(QUIZ_STAGES.RESULTS);
    }
  };

  return (
    <div className="quiz-container">
      {currentQuestion != null && (
        <QuizQuestion
          handleNextQuestion={handleNextQuestion}
          questionData={currentQuestion}
          questionIndex={currentQuestionIndex}
        />
      )}
    </div>
  );
};

export default Quiz;

const QuizQuestion = ({ handleNextQuestion, questionData, questionIndex }) => {
  const incrementCorrectAnswers = useQuizStore(
    (state) => state.incrementCorrectAnswers
  );

  const timeBarRef = useRef();
  const animationRef = useRef(null);

  useEffect(() => {
    if (!timeBarRef.current) {
      return;
    }

    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.fromTo(
      timeBarRef.current,
      { scaleY: 1 }, // from
      {
        scaleY: 0,
        duration: questionData.Duration,
        ease: "linear",
        onComplete: onTimeFinished,
      }
    );

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [questionData]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const shuffledOptions = questionData
    ? shuffleArray(questionData.Options)
    : [];

  function handleAnswerSelection(selectedOption) {
    if (selectedOption.isCorrect) {
      incrementCorrectAnswers();
    }

    handleNextQuestion();
  }

  function onTimeFinished() {
    handleNextQuestion();
  }

  return (
    <div className="question">
      <div className="top-content">
        <h4>Question #{questionIndex + 1} </h4>
        <p>{questionData.Question}</p>
      </div>

      <div className="options">
        {shuffledOptions.map((option, index) => (
          <button
            key={`btn-option-${index}`}
            onClick={() => handleAnswerSelection(option)}
          >
            {option.Label}
          </button>
        ))}
      </div>

      <div className="timer">
        <div ref={timeBarRef} className="bar"></div>
      </div>
    </div>
  );
};
