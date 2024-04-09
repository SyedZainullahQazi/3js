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
    <div id="scene">
      <NewScene shape={tool}/>
      <ToolBox handleTool={handleTool}/>
    </div>
    </>
  );
}

export default App;