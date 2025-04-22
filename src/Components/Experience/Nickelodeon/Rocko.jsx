import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Rocko = ({ planeRef, visible }) => {
  const group = useRef();
  const { nodes, animations } = useGLTF("/assets/models/Rocko.glb");

  const { actions, mixer } = useAnimations(animations, group);
  const animationAction = useRef(null);

  const texture = useTexture("/assets/models/textures/rockoTexture.png");
  texture.encoding = THREE.sRGBEncoding;
  texture.flipY = false;

  useEffect(() => {
    const firstAnimationName = animations[0]?.name;

    if (firstAnimationName && actions[firstAnimationName]) {
      animationAction.current = actions[firstAnimationName];
      animationAction.current.play();
    }

    return () => {
      if (animationAction.current) {
        animationAction.current = null;
      }
    };
  }, [actions, animations, mixer]);
  return (
    <>
      <group ref={group} visible={visible} dispose={null}>
        <group name="Scene">
          <group
            name="Armature"
            position={[0, -1.25, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.02}
          >
            <skinnedMesh
              name="Object_2"
              geometry={nodes.Object_2.geometry}
              skeleton={nodes.Object_2.skeleton}
            >
              <meshStandardMaterial
                map={texture}
                clippingPlanes={planeRef.current ? [planeRef.current] : []}
                clipIntersection={true}
                stencilWrite={false}
                stencilFunc={THREE.EqualStencilFunc}
                stencilRef={1}
              />
            </skinnedMesh>
            <primitive object={nodes.mixamorigHips} />
          </group>
        </group>
      </group>
    </>
  );
};

export default Rocko;

useGLTF.preload("/assets/models/Rocko.glb");
