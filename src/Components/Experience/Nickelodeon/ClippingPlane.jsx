import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import useQuizStore, { QUIZ_STAGES } from "../../../store/quizStore";

const ClippingPlane = ({ planeRef, planeSecondary }) => {
  const planeVisual = useRef();
  const animationRef = useRef(null);

  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionId);
  const currentQuestions = useQuizStore((state) => state.currentQuestions);
  const currentStage = useQuizStore((state) => state.currentStage);

  const questionData = currentQuestions[currentQuestionIndex];

  useFrame((state, delta) => {
    if (!planeVisual.current || !planeRef.current) {
      return;
    }

    planeRef.current.setComponents(0, -1, 0, planeVisual.current.position.y);
    planeVisual.current.rotation.y += 10;
    planeSecondary.current.setComponents(
      0,
      1,
      0,
      -planeVisual.current.position.y
    );
  });

  useEffect(() => {
    if (!planeVisual.current || currentStage != QUIZ_STAGES.QUIZ) {
      return;
    }

    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.fromTo(
      planeVisual.current.position,
      { y: 2 }, // from
      {
        y: -1.8,
        duration: questionData ? questionData.Duration : 20,
        ease: "linear",
      }
    );

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [currentQuestionIndex, currentStage]);

  return (
    <>
      <mesh
        ref={planeVisual}
        rotation={[(Math.PI / 2) * 1, 0, 0]}
        position={[0, 2, 0]}
      >
        <planeGeometry scale={5} args={[1, 1]} />
        <meshBasicMaterial
          color="red"
          transparent={true}
          opacity={0}
          side={THREE.DoubleSide}
          stencilWrite={true}
          stencilFunc={THREE.AlwaysStencilFunc}
          stencilRef={1}
          stencilZPass={THREE.ReplaceStencilOp}
        />
      </mesh>
    </>
  );
};

export default ClippingPlane;
