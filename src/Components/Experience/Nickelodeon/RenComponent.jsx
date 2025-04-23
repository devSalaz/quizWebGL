import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material";

const RenComponent = () => {
  const { nodes, materials } = useGLTF("/assets/models/Ren.glb");

  const rightEye = useRef();
  const groupRightEye = useRef();
  const groupLeftEye = useRef();
  const materialRef = useRef();

  const { camera } = useThree();

  const [mouseData] = useState({ x: 0, y: 0 });

  const lerpedTarget = useRef(new THREE.Vector3());

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
    if (
      !groupRightEye.current ||
      !groupLeftEye.current ||
      !materialRef.current
    ) {
      return;
    }

    const vector = new THREE.Vector3(mouseData.x, mouseData.y, 0.5);
    vector.unproject(camera);

    const dir = vector.sub(camera.position).normalize();
    const distance = 3.5;
    const target = new THREE.Vector3()
      .copy(camera.position)
      .add(dir.multiplyScalar(distance));

    lerpedTarget.current.lerp(target, 0.1);

    groupRightEye.current.lookAt(lerpedTarget.current);
    groupLeftEye.current.lookAt(lerpedTarget.current);

    materialRef.current.uniforms.uTime.value += 0.05;
  });

  return (
    <>
      <group dispose={null} scale={5} position={[0, -4.65, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body.geometry}
          material={materials.Ren_Mat}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <group ref={groupLeftEye} position={[0.146, 0.796, 0.232]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.EyeLeft.geometry}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial roughness={0.2} map={materials.Ren_Mat.map} />
          </mesh>
        </group>

        <group ref={groupRightEye} position={[-0.146, 0.796, 0.232]}>
          <mesh
            ref={rightEye}
            castShadow
            receiveShadow
            geometry={nodes.EyeRight.geometry}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial roughness={0.2} map={materials.Ren_Mat.map} />
          </mesh>
        </group>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hair.geometry}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <CustomShaderMaterial
            ref={materialRef}
            baseMaterial={THREE.MeshPhysicalMaterial}
            vertexShader={vertexShader}
            uniforms={{
              uTime: { value: 0 },
            }}
            roughness={0.05}
            color={0x000000}
          />
        </mesh>
      </group>
    </>
  );
};

export default RenComponent;
useGLTF.preload("/assets/models/Ren.glb");

const vertexShader = `
uniform float uTime;

void main() {

  csm_Position.y += sin(csm_Position.x * 20.0 + uTime) * 0.05 * csm_Position.y * 1.5;
  csm_Position.z += sin(csm_Position.x * 20.0 + uTime) * 0.05 * csm_Position.y * 0.25;
}
`;
