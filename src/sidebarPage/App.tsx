import React from "react";

import "./global.scss";
import "./App.scss";

import Reference from "./pages/Reference";
import History from "./pages/History";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1 className="title">{whale.i18n.getMessage("title")}</h1>
      </div>
      <div className="content">
        <Reference />
        <History />
      </div>
    </div>
  );
}

export default App;
