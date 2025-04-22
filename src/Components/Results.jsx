import React from "react";
import useQuizStore, { QUIZ_STAGES } from "../store/quizStore";

//Styles
import "../assets/Styles/resultsStyles.css";

const Results = () => {
  const currentQuiz = useQuizStore((state) => state.currentQuiz);
  const correctAnswersCount = useQuizStore(
    (state) => state.correctAnswersCount
  );

  const setStage = useQuizStore((state) => state.setStage);
  const resetTheQuiz = useQuizStore((state) => state.resetQuiz);

  const questionsQuantity = currentQuiz.questions.length;

  function setSelectQuizState() {
    resetTheQuiz();

    setStage(QUIZ_STAGES.SELECTING_QUIZ);
  }

  function getResultText() {
    const isApproved = correctAnswersCount / questionsQuantity > 0.5;
    const isNickelodeonTest = currentQuiz.sku === "nickelodeon";
    const baseTikTokMessage = isApproved
      ? "You need to stop watching TikTok dude!"
      : "You need to start watching more TikTok dude!";

    if (isNickelodeonTest) {
      return isApproved
        ? "Nice work! You outsmarted Plankton and (almost) everyone made it out in one piece. The Krabby Patty secret formula is safe — for now... "
        : "You were too late. Plankton’s laser sliced through the Nicktoons one by one. The Krabby Patty formula is gone, and so are they. Next time, don’t miss!";
    } else {
      return baseTikTokMessage;
    }
  }

  const resultText = getResultText();

  return (
    <div className="results-container">
      <h4>You finished the quiz</h4>

      <h5>
        You answered {correctAnswersCount} / {questionsQuantity}{" "}
      </h5>

      <p>{resultText}</p>

      <button onClick={setSelectQuizState}>Try another quiz</button>
    </div>
  );
};

export default Results;
