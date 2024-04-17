import React, { useEffect, useState } from 'react';

import NewScene from './components/newCanvas';
import ToolBox from './components/Toolbox';
import { Vector3 } from 'three';

function App() {
  const [tool,setTool]=useState("");
  const [position,setPosition]=useState(new Vector3(1,1,1));
  const [color,setColor]=useState("");
  const [shapes,setShapes]=useState([]);
  const [selectedShapeId,setSelectedShapeId]=useState(false);

  useEffect(()=>{
    console.log("Selected Shape ID",selectedShapeId)
  },[selectedShapeId])

  const handleSelectedShapeId=(value)=>{
    setSelectedShapeId(value);
  }
  const handleShapes=(value)=>{
    setShapes(value);
  }

  const handlePosition=(value)=>{
    setPosition(value);
  }

  const handleTool=(value)=>{
    setTool(value);
  }
  const handleColor=(value)=>{
    setColor(value);
  }

  return (
    <>
    <div className=" overflow-hidden">
    <ToolBox handleTool={handleTool} handlePosition={handlePosition} handleColor={handleColor} shapes={shapes} handleSelectedShapeId={handleSelectedShapeId}/>
    </div>
    <div id="scene" className="flex justify-center w-[100vw] h-[85vh] overflow-hidden">
      <NewScene shape={tool} updatedPosition={position} color={color} handleShapes={handleShapes} selectedShapeId={selectedShapeId}/>
    </div>
    
    
    </>
  );
}

export default App;