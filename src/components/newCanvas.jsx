import React, { useEffect, useRef, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera  } from '@react-three/drei';
import { Plane, Raycaster, Vector2, Vector3, TextureLoader } from 'three';
import Shapes from './Shapes';

import maptile from "../tile.jpeg"


export default function NewScene({shape}) {
  
  const [posCordinates, setPosCordinates] = useState([]);
  const mouse = new Vector2();
  const intersectionPoint = new Vector3();
  const planeNormal = new Vector3();
  const plane = new Plane();
  const raycaster = new Raycaster();

  const orbitRef = useRef();
  const cameraRef = useRef();

  const handlePointerMissed = (event) => {
    if(shape){
    const canvas = event.target;
    mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1;

    planeNormal.copy(cameraRef.current.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, new Vector3(0, 0, 0));
    raycaster.setFromCamera(mouse, cameraRef.current);
    raycaster.ray.intersectPlane(plane, intersectionPoint);

    if(intersectionPoint.y<0.5){intersectionPoint.y=0.5}
    const updatedPost = [...posCordinates, [intersectionPoint.x, intersectionPoint.y, intersectionPoint.z,shape]];
    setPosCordinates(updatedPost);
    }
  };

  return (
    <>
    <Canvas style={{ background: '#FEFEFE', width: '100vw', height: '85vh' }} onPointerMissed={handlePointerMissed}>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 10, 0]} />
      {posCordinates.length > 0 && posCordinates.map((posCordinate, index) => (
          <Shapes key={index} posCoordinate={posCordinate} type={posCordinate[3]} />
      ))}
       <ambientLight />
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}  >
        <planeGeometry args={[10,10 ]} />
        <meshStandardMaterial map={new TextureLoader().load(maptile)} />
      </mesh>
      <OrbitControls ref={orbitRef} />
      <gridHelper args={[12, 12]} />
      <axesHelper args={[4]} />
    </Canvas>
    </>
  );
}
