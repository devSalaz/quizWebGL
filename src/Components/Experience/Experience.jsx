import React from "react";
import { Canvas } from "@react-three/fiber";
import useQuizStore, { QUIZ_STAGES } from "../../store/quizStore";
import * as THREE from "three";

//Components
import Scene from "./Scene";

//Styles
import "../../assets/Styles/experienceStyles.css";

const Experience = () => {
  const currentStage = useQuizStore((state) => state.currentStage);
  const currentQuiz = useQuizStore((state) => state.currentQuiz);

  const isActive =
    currentStage === QUIZ_STAGES.QUIZ ||
    currentStage === QUIZ_STAGES.RESULTS ||
    currentStage === QUIZ_STAGES.QUIZ_SPECIFIC_INTRO;

  return (
    <div className={`webgl-container ${isActive ? "active" : ""}`}>
      <Canvas
        onCreated={(state) => (state.gl.localClippingEnabled = true)}
        gl={{
          outputEncoding: THREE.sRGBEncoding,
          toneMapping: THREE.NoToneMapping,
          stenci: true,
          localClippingEnabled: true,
        }}
        camera={{ fov: 30, position: [0, 0, 10] }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Experience;
