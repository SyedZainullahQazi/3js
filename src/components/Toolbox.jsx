import React, { useState } from 'react';
import { Vector3 } from 'three';

const ToolBox = ({ handleTool, handlePosition,handleColor}) => {
  const [position, setPosition] = useState(new Vector3(0, 0, 0));
  const [inputs, setInputs] = useState({ x: '', y: '', z: '' });
  const [color, setColor] = useState('#ffffff'); // Initial color value

  const handleButtonClick = (value) => {
    handleTool(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    handleColor(e.target.value);
  };

  const handleSubmit = () => {
    const { x, y, z } = inputs;

    const newX = parseFloat(x);
    const newY = parseFloat(y);
    const newZ = parseFloat(z);

    if (!isNaN(newX) && !isNaN(newY) && !isNaN(newZ)) {
      const newPosition = new Vector3(newX, newY, newZ);
      console.log("New Position From Toolbox");
      console.log(newPosition);
      handlePosition(newPosition);
    }
  };

  return (
    <div id="controls" className="flex justify-center gap-x-4">
      <button onClick={() => handleButtonClick('Sphere')}>Sphere</button>
      <button onClick={() => handleButtonClick('Box')}>Box</button>
      <button onClick={() => handleButtonClick('Octahedral')}>Octahedral</button>

      {/* Input fields for position */}
      <div>
        <label>
          X:
          <input
            type="number"
            name="x"
            value={inputs.x}
            onChange={handleChange}
          />
        </label>
        <label>
          Y:
          <input
            type="number"
            name="y"
            value={inputs.y}
            onChange={handleChange}
          />
        </label>
        <label>
          Z:
          <input
            type="number"
            name="z"
            value={inputs.z}
            onChange={handleChange}
          />
        </label>

        {/* Color picker */}
        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
          />
        </label>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ToolBox;
