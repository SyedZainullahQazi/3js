import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Plane, Raycaster, SphereGeometry, Vector2, Vector3 } from 'three';

export default function NewScene() {
  const orbitRef = useRef();
  const cameraRef = useRef();
  const [posCordinates, setPosCordinates] = useState([]);

  const mouse = new Vector2();
  const intersectionPoint = new Vector3();
  const planeNormal = new Vector3();
  const plane = new Plane();
  const raycaster = new Raycaster();

  useEffect(() => {
    console.log("POS CORDINATE ARRAY");
    console.log(posCordinates[0]);
  }, [posCordinates]);

  const handlePointerMissed = (event) => {
    const canvas = event.target;
    mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1;

    planeNormal.copy(cameraRef.current.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, new Vector3(0, 0, 0));
    raycaster.setFromCamera(mouse, cameraRef.current);
    raycaster.ray.intersectPlane(plane, intersectionPoint);

    console.log("INTERSECTION");
    console.log([intersectionPoint.x, intersectionPoint.y, intersectionPoint.z]);

    const updatedPost = [...posCordinates, [intersectionPoint.x, intersectionPoint.y, intersectionPoint.z]];
    setPosCordinates(updatedPost);
  };

  return (
    <Canvas style={{ background: '#FEFEFE', width: '100vw', height: '100vh' }} onPointerMissed={handlePointerMissed}>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[6, 8, 14]} />
      {posCordinates.length > 0 && posCordinates.map((posCordinate, index) => (
        <mesh key={index} position={posCordinate}>
          <sphereGeometry args={[0.3, 32]} />
          <meshStandardMaterial />
        </mesh>
      ))}
      <OrbitControls ref={orbitRef} />
      <gridHelper args={[12, 12]} />
      <axesHelper args={[4]} />
    </Canvas>
  );
}
