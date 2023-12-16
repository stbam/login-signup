import "./Home.css";
import React, { useState } from "react";
import Canvas from "./Canvas"


function App() {
  const [scribbleTitle, setScribbleTitle] = useState("");
  const [scribbleDescription, setScribbleDescription] = useState("");

  const handleDownload = () => {
    // Check if text areas are filled before proceeding with download
    if (scribbleTitle.trim() === "" || scribbleDescription.trim() === "") {
      alert("Please fill in both Scribble Title and Scribble Description.");
      return;
    }

    const canvas = document.getElementById("canvas");
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "drawing.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <header>
        <h1>ScribbleBook</h1>
      </header>
      <main>
        <div id="leftDiv">
          <Canvas/>
        </div>
        <div id="rightDiv">
          <h3>Scribble Title</h3>
          <input
            type="text"
            placeholder="Enter Drawing Title"
            value={scribbleTitle}
            onChange={(e) => setScribbleTitle(e.target.value)}
          ></input>
          <h3>Scribble Description</h3>
          <textarea
            type="text"
            placeholder="Enter Drawing Description"
            value={scribbleDescription}
            onChange={(e) => setScribbleDescription(e.target.value)}
          ></textarea>
          <button onClick={handleDownload}>Submit</button>
        </div>
      </main>
    </div>
  );
}

export default App;
