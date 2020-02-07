import React from "react";

import "./global.scss";
import "./App.scss";

import Announcement from "./components/Announcement";
import SyncedTabs from "./components/SyncedTabs";
import History from "./components/History";

function App() {
  console.log("window", window);

  window.addEventListener("scroll", () => {
    // console.log("window screen", window.screen);
    // console.log("scrollY", window.scrollY);

    if (window.screen.height < window.scrollY) {
      console.log("available");
    }
  });

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">{whale.i18n.getMessage("title") || "title"}</h1>
        <button
          type="button"
          className="history-link"
          onClick={() => whale.tabs.create({ url: "whale://history/" })}
        >
          {whale.i18n.getMessage("open_whale_history_page") ||
            "open_whale_history_page"}
        </button>
      </div>
      <div className="content">
        <Announcement />
        <SyncedTabs />
        <History />
      </div>
    </div>
  );
}

export default App;
