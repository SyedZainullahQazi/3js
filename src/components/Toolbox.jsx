import React, { useState } from 'react';

const ToolBox = ({handleTool}) => {

  const handleButtonClick = (value) => {
    handleTool(value);
    console.log(value);
  };

  return (
    <div id="controls" className="flex justify-center w-[100vw] mt-4 gap-x-4">
      <button onClick={() => handleButtonClick('Sphere')}>Sphere</button>
      <button onClick={() => handleButtonClick('Box')}>Box</button>  
      <button onClick={() => handleButtonClick('Octahedral')}>Octahedral</button>
    </div>
  );
}

export default ToolBox;