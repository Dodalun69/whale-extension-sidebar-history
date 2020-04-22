import React, { useState, useEffect } from "react";

import "./global.scss";
import "./App.scss";

import Announcement from "./components/Announcement";
import SyncedTabs from "./components/SyncedTabs";
import History from "./components/History";
import Footer from "./components/Footer";

import { Key, getStorageData } from "./storage";

function App() {
  const [isAnnouncePageOpen, setIsAnnouncePageOpen] = useState<boolean>(false);

  function initial() {
    getStorageData(Key.isAnnouncementNeverSeeAgain).catch((error: Error) => {
      if (error.message === "undefined") {
        // 아직 값이 지정되지 않음(신규 설치)
        setIsAnnouncePageOpen(true);
      }
    });
  }

  useEffect(() => {
    initial();
  }, []);

  return (
    <div className="App">
      <header>
        <div>
          <h1>{whale.i18n.getMessage("header__title") || "header__title"}</h1>
          <button
            type="button"
            onClick={() => whale.tabs.create({ url: "whale://history/" })}
          >
            {whale.i18n.getMessage("header__open_whale_history_page") ||
              "header__open_whale_history_page"}
          </button>
        </div>
      </header>
      <main>
        {isAnnouncePageOpen ? <Announcement /> : null}
        <SyncedTabs />
        <History />
      </main>
      <Footer />
    </div>
  );
}

export default App;
