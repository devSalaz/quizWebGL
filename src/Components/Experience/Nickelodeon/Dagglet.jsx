import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Dagglet = ({ planeRef, visible }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/assets/models/Dagglet.glb"
  );

  const { actions, mixer } = useAnimations(animations, group);
  const animationAction = useRef(null);

  useEffect(() => {
    const firstAnimationName = animations[1]?.name;

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
            name="Daggetobjcleanermaterialmergergles"
            rotation={[0, 0, 0]}
            scale={1}
          />
          <group
            name="Armature"
            position={[0, -1, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={1.75}
          >
            <skinnedMesh
              name="Object_2"
              geometry={nodes.Object_2.geometry}
              skeleton={nodes.Object_2.skeleton}
              renderOrder={0}
            >
              <meshStandardMaterial
                map={materials.Dagget_Costume_01_Mat.map}
                clippingPlanes={planeRef.current ? [planeRef.current] : []}
                clipIntersection={true}
                stencilWrite={true}
                stencilFunc={THREE.AlwaysStencilFunc} // Changed to AlwaysStencilFunc
                stencilRef={1}
                stencilZPass={THREE.ReplaceStencilOp}
              />
            </skinnedMesh>

            <primitive object={nodes.mixamorigHips} />
          </group>
        </group>
      </group>
    </>
  );
};

export default Dagglet;
useGLTF.preload("/assets/models/Dagglet.glb");
