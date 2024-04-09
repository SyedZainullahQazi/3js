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
    
    <div id="scene" className="flex justify-center">
      <NewScene shape={tool}/>
      
    </div>
    <div className="w-[auto] h-[auto] m-4  overflow-x-hidden">
    <ToolBox handleTool={handleTool}/>
    </div>
    </>
  );
}

export default App;