import React, { useRef } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import useQuizStore, { QUIZ_STAGES } from "../../../store/quizStore";

//Components
import RenComponent from "./RenComponent";
import NickelodeonQuizScene from "./NickelodeonQuizScene";

import ClippingPlane from "./ClippingPlane";

const NickelodeonScene = () => {
  const clipPlaneRef = useRef();

  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));

  const currentStage = useQuizStore((state) => state.currentStage);
  let currentComponent;

  switch (currentStage) {
    case QUIZ_STAGES.QUIZ_SPECIFIC_INTRO:
      currentComponent = <RenComponent />;
      break;
    case QUIZ_STAGES.QUIZ:
      currentComponent = <NickelodeonQuizScene planeRef={plane} />;
      break;
    case QUIZ_STAGES.RESULTS:
      currentComponent = null;
      break;
    default:
      currentComponent = null;
  }

  return (
    <>
      {currentComponent}

      <Environment
        preset="city"
        environmentIntensity={1.15}
        backgroundBlurriness={1}
      />
      <OrbitControls />

      <ClippingPlane planeRef={plane} />
    </>
  );
};

export default NickelodeonScene;
