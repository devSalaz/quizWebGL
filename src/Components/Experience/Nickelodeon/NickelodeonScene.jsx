import React, { useRef } from "react";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import useQuizStore, { QUIZ_STAGES } from "../../../store/quizStore";

//Components
import RenComponent from "./RenComponent";
import NickelodeonQuizScene from "./NickelodeonQuizScene";

import ClippingPlane from "./ClippingPlane";

const NickelodeonScene = () => {
  //const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));
  const planeRef = useRef();
  const planeSecondary = useRef();

  const currentStage = useQuizStore((state) => state.currentStage);
  let currentComponent;

  switch (currentStage) {
    case QUIZ_STAGES.QUIZ_SPECIFIC_INTRO:
      currentComponent = <RenComponent />;
      break;
    case QUIZ_STAGES.QUIZ:
      currentComponent = (
        <NickelodeonQuizScene
          planeRef={planeRef}
          planeSecondary={planeSecondary}
        />
      );
      break;
    case QUIZ_STAGES.RESULTS:
      currentComponent = null;
      break;
    default:
      currentComponent = <RenComponent />;
  }

  return (
    <>
      {currentComponent}

      <Environment
        preset="sunset"
        environmentIntensity={0.75}
        backgroundBlurriness={1}
      />

      <directionalLight intensity={4} color={0x5cad4a} />

      <ambientLight color={0xf57d0d} intensity={0.5} />

      <plane ref={planeRef} normal={[0, -1, 0]} constant={0} />
      <plane ref={planeSecondary} normal={[0, 1, 0]} constant={0} />

      <ClippingPlane planeRef={planeRef} planeSecondary={planeSecondary} />
    </>
  );
};

export default NickelodeonScene;
