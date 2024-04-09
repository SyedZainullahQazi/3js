import { SphereGeometry, BoxGeometry, OctahedronGeometry } from 'three';
import { useMemo } from 'react';

const Shapes = ({ type, index, posCoordinate }) => {
  const geometry = useMemo(() => {
    if (type === "Sphere") {
      return new SphereGeometry(0.3, 32, 32);
    } else if (type === "Box") {
      return new BoxGeometry(0.3, 0.3, 0.3);
    } else if (type === "Octahedral") {
      return new OctahedronGeometry(0.3, 0);
    } else {
      return null;
    }
  }, [type]);

  if (!geometry) return null;

  return (
    <mesh key={index} position={posCoordinate} geometry={geometry}>
      <meshStandardMaterial />
    </mesh>
  );
}

export default Shapes;
