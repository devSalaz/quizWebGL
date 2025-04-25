import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Jimmy = ({ planeRef, planeSecondary, visible }) => {
  const group = useRef();
  const { nodes, animations } = useGLTF("/assets/models/Jimmy.glb");

  const { actions, mixer } = useAnimations(animations, group);
  const animationAction = useRef(null);

  const texture = useTexture("/assets/models/textures/jimmyTexture.png");
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
      <group ref={group} dispose={null} visible={visible}>
        <group name="Scene">
          <group
            name="Armature"
            position={[0, -1.5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.02}
          >
            <skinnedMesh
              name="Object_3"
              geometry={nodes.Object_3.geometry}
              skeleton={nodes.Object_3.skeleton}
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
            <primitive object={nodes.mixamorigHips} />
          </group>

          {/* Bones */}

          <group
            name="Armature"
            position={[0, -1.5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.02}
          >
            <skinnedMesh
              name="Object_3"
              geometry={nodes.Object_3.geometry}
              skeleton={nodes.Object_3.skeleton}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.01}
            >
              <meshStandardMaterial
                roughness={0.25}
                color={0xe3dac9}
                wireframe={true}
                wireframeLinewidth={0.5}
                clippingPlanes={
                  planeSecondary.current ? [planeSecondary.current] : []
                }
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

export default Jimmy;

useGLTF.preload("/assets/models/Jimmy.glb");
