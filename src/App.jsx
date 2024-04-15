import React, { useEffect, useState } from 'react';

import NewScene from './components/newCanvas';
import ToolBox from './components/Toolbox';
import { Vector3 } from 'three';

function App() {
  const [tool,setTool]=useState("");
  const [position,setPosition]=useState(new Vector3(1,1,1));
  const [color,setColor]=useState("");

  

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
    <div className="w-[auto] h-[auto] m-4  overflow-hidden">
    <ToolBox handleTool={handleTool} handlePosition={handlePosition} handleColor={handleColor}/>
    </div>
    <div id="scene" className="flex justify-center w-[100vw] h-[85vh] overflow-hidden">
      <NewScene shape={tool} updatedPosition={position} color={color}/>
    </div>
    
    
    </>
  );
}

export default App;