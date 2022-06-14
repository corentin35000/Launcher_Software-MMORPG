import React from "react";
import "./window-patcher.scss";
import imgTest from './assets/background.jpg';

const WindowPatcher = () => {
  const { patcher } = require("./patcher.js");
  const { ipcRenderer } = require("electron");

  ipcRenderer.on("call-patcher", () => {
    patcher();
  });

  return (
      <div className="App">
          <div style={{ display: 'flex', justifyContent: 'space-between',  height: '10vh', backgroundColor: 'maroon' }}>
              <button>Logo</button>
              <button>Play</button>
              <div></div>
          </div>

          <div style={{ display: 'flex', backgroundColor: 'red', height: '88vh' }}>
              <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'yellow' }}>

              </div>

              <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'blue' }}>

              </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', height: '2vh' }}>
              <p>1.0.4</p>
              <button>Logo_Studio</button>
          </div>
    </div>
  );
};

export default WindowPatcher;
