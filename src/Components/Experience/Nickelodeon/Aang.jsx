import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Aang = ({ planeRef, planeSecondary, visible }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/assets/models/Aang.glb");

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
            name="Aangobjcleanermaterialmergergles"
            rotation={[0, 0, 0]}
            scale={1}
          />
          <group
            name="Armature"
            position={[0, -1.5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={1.85}
          >
            <skinnedMesh
              name="Object_2"
              geometry={nodes.Object_2.geometry}
              skeleton={nodes.Object_2.skeleton}
            >
              <meshStandardMaterial
                map={materials.Aang_Body_02_Mat.map}
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
            >
              <meshStandardMaterial
                map={materials.Aang_Costume_01B_Mat.map}
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
            >
              <meshStandardMaterial
                map={materials.Aang_Expressions_Mat.map}
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
            scale={1.85}
          >
            <skinnedMesh
              name="Object_2"
              geometry={nodes.Object_2.geometry}
              skeleton={nodes.Object_2.skeleton}
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
            <skinnedMesh
              name="Object_3"
              geometry={nodes.Object_3.geometry}
              skeleton={nodes.Object_3.skeleton}
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
            <skinnedMesh
              name="Object_4"
              geometry={nodes.Object_4.geometry}
              skeleton={nodes.Object_4.skeleton}
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

export default Aang;

useGLTF.preload("/assets/models/Aang.glb");
