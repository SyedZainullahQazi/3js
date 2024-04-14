import { SphereGeometry, BoxGeometry, OctahedronGeometry, Vector3, Vector2, Plane, Raycaster } from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useGesture } from 'react-use-gesture';
import { useThree } from '@react-three/fiber';

const Shapes = ({ type, index, posCoordinate,currCamera,currCanvas}) => {
  // useEffect(()=>{
  //   console.log(currCamera,currCanvas.clientHeight);
  // },[])
  const geometry = useMemo(() => {
    if (type === "Sphere") {
      return new SphereGeometry(0.2, 32, 32);
    } else if (type === "Box") {
      return new BoxGeometry(0.3, 0.3, 0.3);
    } else if (type === "Octahedral") {
      return new OctahedronGeometry(0.3, 0);
    } else {
      return null;
    }
  }, [type]);

  if (!geometry) return null;
  const meshRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const mouse = new Vector2();
  const intersectionPoint = new Vector3();
  const planeNormal = new Vector3();
  const plane = new Plane();
  const raycaster = new Raycaster();

  const handleMouseMove = (event) => {
    if (isDragging) {
      console.log(event.offsetX)

      const {clientWidth,clientHeight}=currCanvas;
      mouse.x = (event.offsetX / clientWidth) * 2 - 1;
      mouse.y = -(event.offsetY / clientHeight) * 2 + 1;

      planeNormal.copy(currCamera.position).normalize();
      plane.setFromNormalAndCoplanarPoint(planeNormal, new Vector3(0, 0, 0));
      raycaster.setFromCamera(mouse,currCamera);
      raycaster.ray.intersectPlane(plane, intersectionPoint);
      intersectionPoint.y=0.20;
      console.log(intersectionPoint)
      meshRef.current.position.copy(intersectionPoint);
    }
  };

  return (
    <mesh key={index} ref={meshRef} position={posCoordinate} geometry={geometry} 
      onPointerDown={handleMouseDown}
      onPointerUp={handleMouseUp}
      onPointerMove={handleMouseMove}
    >
      <meshStandardMaterial color={isDragging?"red":"white"} />
    </mesh>
  );
}

export default Shapes;
