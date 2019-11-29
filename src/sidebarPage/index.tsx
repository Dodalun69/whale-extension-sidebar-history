import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.scss";

window.addEventListener(
  "dragover",
  event => {
    const evt = event;
    evt.preventDefault();
    evt.dataTransfer.effectAllowed = "none";
    evt.dataTransfer.dropEffect = "none";
  },
  false
);

window.addEventListener(
  "drop",
  event => {
    const evt = event;
    evt.preventDefault();
    evt.dataTransfer.effectAllowed = "none";
    evt.dataTransfer.dropEffect = "none";
  },
  false
);

ReactDOM.render(<App />, document.getElementById("root"));
