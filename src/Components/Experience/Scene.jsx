import React from "react";
import useQuizStore, { QUIZ_STAGES } from "../../store/quizStore";

//Components
import NickelodeonScene from "./Nickelodeon/NickelodeonScene";
import BrainrotScene from "./Brainrot/BrainrotScene";

const Scene = () => {
  let currentScene;

  const currentQuiz = useQuizStore((state) => state.currentQuiz);

  switch (currentQuiz?.sku) {
    case "brainrot":
      currentScene = <BrainrotScene />;
      break;
    case "nickelodeon":
      currentScene = <NickelodeonScene />;
      break;
    default:
      currentScene = <BrainrotScene />;
  }

  return <>{currentQuiz != null && currentScene}</>;
};

export default Scene;
