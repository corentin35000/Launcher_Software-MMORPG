import React from "react";
import "./window-loader.scss";

const WindowLoader = () => {
  // Listen for messages
  const { ipcRenderer } = require("electron");
  ipcRenderer.on("message", (event, text) => {
    document.getElementById("LoaderContent").innerHTML = text;
  });

  return (
    <div id="LoaderWrapper">
      <div id="LoaderContent">CHECKING FOR UPDATES LAUNCHER...</div>
    </div>
  );
};

export default WindowLoader;
