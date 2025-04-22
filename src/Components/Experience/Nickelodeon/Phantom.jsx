import React, { useRef, useEffect, useState, useMemo } from "react";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Phantom = ({ planeRef, visible }) => {
  const group = useRef();

  const { nodes, materials, animations } = useGLTF(
    "/assets/models/Phantom.glb"
  );
  const { actions, mixer } = useAnimations(animations, group);
  const animationAction = useRef(null);

  const textureFace = useTexture("/assets/models/textures/phantomFace.jpg");
  textureFace.encoding = THREE.sRGBEncoding;
  textureFace.flipY = false;

  const textureBody = useTexture("/assets/models/textures/phantomBody.jpg");
  textureBody.encoding = THREE.sRGBEncoding;
  textureBody.flipY = false;

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
      <group ref={group} dispose={null} visible={visible}>
        <group name="Scene">
          <group
            name="Armature"
            position={[0, -1.7, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.02}
          >
            <skinnedMesh
              name="Object_2"
              geometry={nodes.Object_2.geometry}
              skeleton={nodes.Object_2.skeleton}
            >
              <meshStandardMaterial
                map={textureBody}
                clippingPlanes={planeRef.current ? [planeRef.current] : []}
                clipIntersection={true}
                stencilWrite={false}
                stencilFunc={THREE.EqualStencilFunc}
                stencilRef={1}
              />
            </skinnedMesh>
            <skinnedMesh
              name="Object_3"
              geometry={nodes.Object_3.geometry}
              material={materials.DannyPhantom_Expressions_Mat}
              skeleton={nodes.Object_3.skeleton}
            >
              <meshStandardMaterial
                map={textureFace}
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

export default Phantom;

useGLTF.preload("/assets/models/Phantom.glb");
