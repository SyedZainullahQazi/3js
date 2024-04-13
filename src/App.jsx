import React, { useState } from 'react';

import NewScene from './components/newCanvas';
import ToolBox from './components/Toolbox';

function App() {
  const [tool,setTool]=useState("");

  const handleTool=(value)=>{
    setTool(value);
  }

  return (
    <>
    <div className="w-[auto] h-[auto] m-4  overflow-hidden">
    <ToolBox handleTool={handleTool}/>
    </div>
    <div id="scene" className="flex justify-center w-[100vw] h-[85vh] overflow-hidden">
      <NewScene shape={tool}/>
    </div>
    
    
    </>
  );
}

export default App;