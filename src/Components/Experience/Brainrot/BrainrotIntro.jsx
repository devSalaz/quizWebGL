import React, { Suspense } from "react";
import useQuizStore from "../../../store/quizStore";

//Components
import BrainrotPlane from "./BrainrotPlane";

const BrainrotIntro = () => {
  const currentQuestions = useQuizStore((state) => state.currentQuestions);

  return (
    <Suspense fallback={null}>
      {currentQuestions.map((question, index) => (
        <BrainrotPlane key={index} index={question.BrainrotId} />
      ))}
    </Suspense>
  );
};

export default BrainrotIntro;
