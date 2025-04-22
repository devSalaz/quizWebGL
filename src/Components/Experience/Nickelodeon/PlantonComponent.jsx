import React, { useRef, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

const PlantonComponent = () => {
  const group = useRef();
  const eyeRef = useRef();
  const groupRef = useRef();

  const { nodes } = useGLTF("/assets/models/platonGLB.glb");

  const texture = useTexture("/assets/models/textures/plantonTexture.jpg");
  texture.encoding = THREE.sRGBEncoding;
  texture.flipY = false;

  return (
    <>
      <group ref={group} dispose={null} scale={0.15} position={[0, -1.75, 0]}>
        <group name="Scene">
          {/* Main body */}
          <mesh
            name="Body"
            geometry={nodes.Body.geometry}
            position={[0, 0, 0]}
            scale={1}
          >
            <meshBasicMaterial map={texture} />
          </mesh>

          {/* Separated Eye */}
          <group ref={groupRef}>
            <mesh
              name="Eye"
              ref={eyeRef}
              geometry={nodes.Eye.geometry}
              position={[0, 0.1, 0.1]} // adjust position as needed
              scale={1}
            >
              <meshBasicMaterial map={texture} />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
};

export default PlantonComponent;
useGLTF.preload("/assets/models/platonGLB.glb");
