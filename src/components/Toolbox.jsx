import React, { useState } from "react";
import { Vector3 } from "three";

const ToolBox = ({ handleTool, handlePosition, handleColor, shapes,handleSelectedShapeId }) => {
  const [inputs, setInputs] = useState({ x: "", y: "", z: "" });
  const [color, setColor] = useState("#ffffff"); 
  const [selectedShape, setSelectedShape] = useState(""); 

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

  const handleShapeChange = (e) => {
    handleSelectedShapeId(e.target.value)
    setSelectedShape(e.target.value);
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
    <div id="controls" className="flex justify-center gap-x-4 mb-2">
      <button onClick={() => handleButtonClick("Sphere")}>Sphere</button>
      <button onClick={() => handleButtonClick("Box")}>Box</button>
      <button onClick={() => handleButtonClick("Octahedral")}>
        Octahedral
      </button>

      {/* Input fields for position */}
      <div className="flex gap-x-2 items-center">
        <div>
          <label>X:</label>
          <input
            type="number"
            name="x"
            value={inputs.x}
            onChange={handleChange}
            className="w-16"
          />
        </div>
        <div>
          <label>Y:</label>
          <input
            type="number"
            name="y"
            value={inputs.y}
            onChange={handleChange}
            className="w-16"
          />
        </div>
        <div>
          <label>Z:</label>
          <input
            type="number"
            name="z"
            value={inputs.z}
            onChange={handleChange}
            className="w-16"
          />
        </div>

        <button onClick={handleSubmit}>Submit</button>

        {/* Color picker */}
        <label className="ml-2">Color:</label>
        <input type="color" value={color} onChange={handleColorChange} />

        {/* Shape selection */}
        <label className="ml-2">Choose A Model:</label>
        <select
          id="shapes"
          name="shapes"
          value={selectedShape}
          onChange={handleShapeChange}
          className="w-24"
        >
          <option value="0">UnSelect</option>
          {shapes && shapes.length > 0 ? (
            shapes.map((shape, index) => (
              <option key={index} value={shape[4]}>
                {shape[3]}
              </option>
            ))
          ) : (
            <option value="">No shapes available</option>
          )}
          
        </select>
      </div>
    </div>
  );
};

export default ToolBox;
