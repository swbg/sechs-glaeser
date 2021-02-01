import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import duck from "./creatives/duck.svg";

ReactDOM.render(
  <React.StrictMode>
    <header className="header">
      <div className="container">
        <img className="duck" src={duck} alt="duck"></img>
        <h1 className="mainHeading">Das Spiel mit den</h1>
        <h1 className="mainHeadingBig">6 Gläsern</h1>
      </div>
    </header>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
