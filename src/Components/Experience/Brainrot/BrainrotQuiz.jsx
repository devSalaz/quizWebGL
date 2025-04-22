import React, { useRef, useState, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import useQuizStore from "../../../store/quizStore";
import gsap from "gsap";

const BrainrotQuiz = () => {
  const currentQuestions = useQuizStore((state) => state.currentQuestions);
  const currentQuestionId = useQuizStore((state) => state.currentQuestionId);

  const currentBrainRotId =
    currentQuestions?.[currentQuestionId]?.BrainrotId ?? 1;

  return (
    <>
      <QuizPlane id={currentBrainRotId} />
    </>
  );
};

export default BrainrotQuiz;

const QuizPlane = ({ id }) => {
  const planeRef = useRef();
  const shaderMaterialRef = useRef();
  const isHovered = useRef(false);

  const texture = useTexture(`/assets/textures/brainrot-${id}.jpg`);
  texture.encoding = THREE.sRGBEncoding;

  const { camera, size } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  useEffect(() => {
    const onMouseMove = (event) => {
      // Convert screen space to NDC
      mouse.current.x = (event.clientX / size.width) * 2 - 1;
      mouse.current.y = -(event.clientY / size.height) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [size]);

  useFrame(() => {
    if (!texture || !shaderMaterialRef.current || !planeRef.current) {
      return;
    }

    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects([planeRef.current]);

    let targetHoverState = 0;

    if (intersects.length > 0) {
      const uv = intersects[0].uv;
      shaderMaterialRef.current.uniforms.uHover.value = uv;
      targetHoverState = 1;
    }

    let currentHoverState = THREE.MathUtils.lerp(
      shaderMaterialRef.current.uniforms.uHoverState.value,
      targetHoverState,
      0.025
    );

    shaderMaterialRef.current.uniforms.uTime.value += 0.01;
    shaderMaterialRef.current.needsUpdate = true;
    shaderMaterialRef.current.uniforms.uHoverState.value = currentHoverState;
  });

  return (
    <mesh ref={planeRef} rotation={[0, 0, 0]} position={[0, 0.25, 0]}>
      <planeGeometry args={[2.5, 2.5, 32, 32]} />
      {texture && (
        <shaderMaterial
          ref={shaderMaterialRef}
          key={texture.uuid}
          uniforms={{
            uTime: { value: 0 },
            uImage: {
              value: texture,
            },
            uHover: { value: new THREE.Vector2(0.5, 0.5) },
            uHoverState: { value: 0 },
          }}
          vertexShader={`
          varying vec2 vUv;
          varying float vNoise;
          uniform sampler2D uImage;
          uniform float uTime;
          uniform vec2 uHover;
          uniform float uHoverState;

          void main() {
            vec3 newPosition = position;
            float PI = 3.1415925;
            float dist = distance(uv, uHover);
            float intensity = uHoverState + 0.85; 

            newPosition.z += intensity * 0.1 * sin(dist * 10.0 + uTime * 2.0);
            newPosition.x += intensity * (uv.x - 0.5) * 0.1; // Subtle horizontal movement
            newPosition.y += intensity * (uv.y - 0.5) * 0.1; // Subtle vertical movement

            vUv = uv;
            vNoise = intensity * sin(dist * 10.0 - uTime);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
            `}
          fragmentShader={`
          varying vec2 vUv;
          varying float vNoise;
          uniform sampler2D uImage;
          uniform float uTime;
          uniform vec2 uHover;
          uniform float uHoverState;

          void main() {
            vec2 newUV = vUv;

            vec2 p = newUV;
            float x = uHoverState;
            x = smoothstep(.0,1.0,(x*2.0+p.y-1.0));
            vec4 f = mix(
              texture2D(uImage, (p-.5)*(1.-x)+.5), 
              texture2D(uImage, (p-.5)*x+.5), 
              x);
            gl_FragColor = f;
            gl_FragColor.rgb += 0.035 * vec3(vNoise);
          }
            `}
        />
      )}
    </mesh>
  );
};
