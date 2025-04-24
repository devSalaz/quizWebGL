import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Calamardo = ({ planeRef, visible }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/assets/models/Calamardo.glb"
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
            name="Squidwardobjcleanermaterialmergergles"
            rotation={[0, 0, 0]}
            scale={1}
          />
          <group
            name="Armature"
            position={[0, -1.25, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={1.6}
          >
            <skinnedMesh
              name="Object_2"
              geometry={nodes.Object_2.geometry}
              skeleton={nodes.Object_2.skeleton}
            >
              <meshStandardMaterial
                map={materials.Squidward_Costume_03_Mat.map}
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
                map={materials.Squidward_Expression_Material.map}
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
                map={materials.Squidward_Base_Material.map}
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

export default Calamardo;

useGLTF.preload("/assets/models/Calamardo.glb");
