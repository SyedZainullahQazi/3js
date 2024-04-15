import { SphereGeometry, BoxGeometry, OctahedronGeometry, Vector3, Vector2, Plane, Raycaster } from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useGesture } from 'react-use-gesture';
import { useThree } from '@react-three/fiber';

const Shapes = ({ type, index, posCoordinate,currCamera,currCanvas,updatedPosition,color}) => {
 
 
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
  const [wantToColor,setWantToColor]=useState(false);
  const [lastColor,setLastColor]=useState("");
  

  useEffect(()=>{
    if(isDragging){
      meshRef.current.scale.x = updatedPosition.x;
      meshRef.current.scale.y = Math.abs(updatedPosition.y);
      meshRef.current.scale.z = updatedPosition.z;

      if (!meshRef.current.geometry.boundingBox){
        meshRef.current.geometry.computeBoundingBox();
      }
      var height = meshRef.current.geometry.boundingBox.max.y - meshRef.current.geometry.boundingBox.min.y;
      meshRef.current.position.y = height * meshRef.current.scale.y / 2;
    }
  },[updatedPosition])

  useEffect(()=>{
    if(isDragging){
      console.log("keep swimming")
      setWantToColor(true);
    }
  },[color])

  const handleMouseDown = () => {
    if(isDragging){
      setLastColor(color)
    }
    setIsDragging(!isDragging);
    
  };

  // const handleMouseUp = () => {
  //   setIsDragging(false);
  // };

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
      if (!meshRef.current.geometry.boundingBox){
        meshRef.current.geometry.computeBoundingBox();
      }
      var height = meshRef.current.geometry.boundingBox.max.y - meshRef.current.geometry.boundingBox.min.y;
      intersectionPoint.y = height * meshRef.current.scale.y / 2;
      meshRef.current.position.copy(intersectionPoint);

    }
  };

  return (
    <mesh key={index} ref={meshRef} position={posCoordinate} geometry={geometry} 
      onPointerDown={handleMouseDown}
      // onPointerUp={handleMouseUp}
      onPointerMove={handleMouseMove}
    >
      <meshStandardMaterial color={isDragging?wantToColor?color:"red":wantToColor?lastColor:"white"} />
    </mesh>
  );
}

export default Shapes;
