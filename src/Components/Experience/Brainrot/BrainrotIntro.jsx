import React from "react";
import useQuizStore from "../../../store/quizStore";

//Components
import BrainrotPlane from "./BrainrotPlane";

const BrainrotIntro = () => {
  const currentQuestions = useQuizStore((state) => state.currentQuestions);

  return (
    <>
      {currentQuestions.map((question, index) => (
        <BrainrotPlane key={index} index={question.BrainrotId} />
      ))}
    </>
  );
};

export default BrainrotIntro;
