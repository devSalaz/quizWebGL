import React, { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const indexPosZMultiplier = 0.05;

const BrainrotPlane = ({ index }) => {
  const lerpDelay = 0.2 / (index + 1);
  const posZ = -index * indexPosZMultiplier;
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, posZ]);

  const planeRef = useRef();
  const materialRef = useRef();
  const prevPosition = useRef(new THREE.Vector3());

  const [mouseData] = useState({ x: 0, y: 0 });

  const texture = useTexture(`/assets/textures/brainrot-${index}.jpg`);
  texture.encoding = THREE.sRGBEncoding;

  const targetPosition = useRef(new THREE.Vector3());
  const interpolatedPosition = useRef(new THREE.Vector3());

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseData.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseData.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    if (!planeRef.current || !materialRef.current) {
      return;
    }

    let currentPosition = planeRef.current.position;

    targetPosition.current.set(
      mouseData.x * (width / 2),
      mouseData.y * (height / 2),
      posZ
    );

    interpolatedPosition.current.lerpVectors(
      currentPosition,
      targetPosition.current,
      lerpDelay
    );

    planeRef.current.position.set(
      interpolatedPosition.current.x,
      interpolatedPosition.current.y,
      posZ
    );

    const direction = currentPosition.x < targetPosition.current.x ? 1 : -1;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uDirection.value = direction;

    const deltaMovement = planeRef.current.position
      .clone()
      .sub(prevPosition.current);
    const velocity = deltaMovement.length();

    const currentMoving = materialRef.current.uniforms.uMoving.value;
    const targetMoving = THREE.MathUtils.clamp(velocity * 10, 0, 1);
    materialRef.current.uniforms.uMoving.value = THREE.MathUtils.lerp(
      currentMoving,
      targetMoving,
      0.1
    );

    prevPosition.current.copy(planeRef.current.position);
  });

  return (
    <>
      <mesh ref={planeRef} rotation={[0, 0, 0]}>
        <shaderMaterial
          ref={materialRef}
          uniforms={{
            uTime: { value: 0 },
            uDirection: { value: 1 },
            uTexture: { value: texture },
            uMoving: { value: 0 },
          }}
          vertexShader={`
            uniform float uTime;
            uniform float uDirection;
            uniform float uMoving;

            varying vec2 vUv;

            void main() {
              vUv = uv;

              vec3 pos = position;

              float fade = 1.0 - abs(pos.y) / (0.5 * 1.46); 
              pos.x += sin(pos.y * 1.0 * uDirection) * 1.0 * fade * uMoving * 0.5;

              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `}
          fragmentShader={`
            uniform sampler2D uTexture;
            varying vec2 vUv;

            void main() {
              gl_FragColor = texture2D(uTexture, vUv);
            }
          `}
          transparent={true}
        />
        <planeGeometry args={[2, 2, 16, 16]} />
      </mesh>
    </>
  );
};

export default BrainrotPlane;
