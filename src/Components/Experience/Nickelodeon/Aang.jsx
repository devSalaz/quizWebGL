import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Aang = ({ planeRef, visible }) => {
  const group = useRef();
  const { nodes, animations } = useGLTF("/assets/models/Aang.glb");

  const { actions, mixer } = useAnimations(animations, group);
  const animationAction = useRef(null);

  const texture = useTexture("/assets/models/textures/aangTexture.png");
  texture.encoding = THREE.sRGBEncoding;
  texture.flipY = false;

  const texture2 = useTexture("/assets/models/textures/aangTexture2.png");
  texture2.encoding = THREE.sRGBEncoding;
  texture2.flipY = false;

  const texture3 = useTexture("/assets/models/textures/aangTexture3.png");
  texture3.encoding = THREE.sRGBEncoding;
  texture3.flipY = false;

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
            <primitive object={nodes.mixamorigHips} />
          </group>
          <skinnedMesh
            name="Object_2"
            geometry={nodes.Object_2.geometry}
            skeleton={nodes.Object_2.skeleton}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
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
          <skinnedMesh
            name="Object_3"
            geometry={nodes.Object_3.geometry}
            skeleton={nodes.Object_3.skeleton}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <meshStandardMaterial
              map={texture2}
              clippingPlanes={planeRef.current ? [planeRef.current] : []}
              clipIntersection={true}
              stencilWrite={false}
              stencilFunc={THREE.EqualStencilFunc}
              stencilRef={1}
            />
          </skinnedMesh>
          <skinnedMesh
            name="Object_4"
            geometry={nodes.Object_4.geometry}
            skeleton={nodes.Object_4.skeleton}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <meshStandardMaterial
              map={texture3}
              clippingPlanes={planeRef.current ? [planeRef.current] : []}
              clipIntersection={true}
              stencilWrite={false}
              stencilFunc={THREE.EqualStencilFunc}
              stencilRef={1}
            />
          </skinnedMesh>
        </group>
      </group>
    </>
  );
};

export default Aang;

useGLTF.preload("/assets/models/Aang.glb");
