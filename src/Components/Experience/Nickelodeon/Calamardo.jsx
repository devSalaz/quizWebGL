import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Calamardo = ({ planeRef, visible }) => {
  const group = useRef();
  const { nodes, animations } = useGLTF("/assets/models/Calamardo.glb");

  const { actions, mixer } = useAnimations(animations, group);
  const animationAction = useRef(null);

  const texture1 = useTexture("/assets/models/textures/calamardo1.png");
  texture1.encoding = THREE.sRGBEncoding;
  texture1.flipY = false;

  const texture2 = useTexture("/assets/models/textures/calamardo2.png");
  texture2.encoding = THREE.sRGBEncoding;
  texture2.flipY = false;

  const texture3 = useTexture("/assets/models/textures/calamardo3.png");
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
            <skinnedMesh
              name="Object_2"
              geometry={nodes.Object_2.geometry}
              skeleton={nodes.Object_2.skeleton}
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
            <skinnedMesh
              name="Object_3"
              geometry={nodes.Object_3.geometry}
              skeleton={nodes.Object_3.skeleton}
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
            <primitive object={nodes.mixamorigHips} />
          </group>
        </group>
      </group>
    </>
  );
};

export default Calamardo;

useGLTF.preload("/assets/models/Calamardo.glb");
