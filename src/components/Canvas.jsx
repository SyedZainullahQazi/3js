import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Plane, Box, Sphere, Circle, Cone, Cylinder, Tube, Torus, TorusKnot, Ring, Tetrahedron, Polyhedron, Icosahedron, Octahedron, Dodecahedron, Extrude, Lathe, Shape, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Scene = () => {
  const canvasRef = useRef();
  const [clickPosition, setClickPosition] = useState(null);

  const handleCanvasClick = (event) => {
    const { clientX, clientY } = event;
    const { width, height } = canvasRef.current.getBoundingClientRect();
    console.log(event);
    console.log(width,height);
    console.log(clientX, clientY )
    // Calculate the click position relative to the canvas
    const x = ((clientX) / width) * 17.5 -8.75;
    const y = -((clientY) / height) * 7.5+3.75;
    console.log(x,y);

    // Set the click position with z-coordinate as 0
    setClickPosition([x,y,0]);
  };

  return (
    <Canvas
      onClick={handleCanvasClick}
      ref={canvasRef}
      camera={{ fov: 75, position: [0, 0, 5] }} // Setting up camera position
      style={{ width: '100vw', height: '100vh' }}
    
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* Render the shapes */}

      {/* Render the circle at the clicked position */}
      {clickPosition && <Circle position={clickPosition} args={[0.2]} />}
      <Box position={[0,-3,0]}/>

      <OrbitControls />
    </Canvas>
  );
};

export default Scene;