import React, { useRef } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import useQuizStore, { QUIZ_STAGES } from "../../../store/quizStore";

//Components
import BrainrotIntro from "./BrainrotIntro";
import BrainrotQuiz from "./BrainrotQuiz";

const BrainrotScene = () => {
  const currentStage = useQuizStore((state) => state.currentStage);
  let currentComponent;

  switch (currentStage) {
    case QUIZ_STAGES.QUIZ_SPECIFIC_INTRO:
      currentComponent = <BrainrotIntro />;
      break;
    case QUIZ_STAGES.QUIZ:
      currentComponent = <BrainrotQuiz />;
      break;
    default:
      currentComponent = null;
  }

  return <>{currentComponent}</>;
};

export default BrainrotScene;
