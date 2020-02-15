import React, { useState, useEffect } from "react";

import "./global.scss";
import "./App.scss";

import Announcement from "./components/Announcement";
import SyncedTabs from "./components/SyncedTabs";
import History from "./components/History";
import TopButton from "./components/TopButton";

async function getStorageData(key: string): Promise<any> {
  whale.storage.local.get([key], function(result) {
    console.log(`Value currently is ${result.key}`);
    return Promise.resolve(result.key);
  });
}
// async function setStorageData(key: string, value: any) {
//   chrome.storage.local.set({ [key]: value }, function() {
//     console.log(`Value is set to ${value}`);
//     return Promise.resolve(result.key);
//   });
// }

function App() {
  const [isSyncedTabsPageOpen, setIsSyncedTabsPageOpen] = useState<boolean>(
    false,
  );
  const [isHistoryPageOpen, setIsHistoryPageOpen] = useState<boolean>(false);
  const [isTopButtonAvailable, setIsTopButtonAvailable] = useState<boolean>(
    false,
  );

  window.addEventListener("scroll", () => {
    if (
      window.screen.height < window.pageYOffset &&
      isTopButtonAvailable === false
    ) {
      setIsTopButtonAvailable(true);
    }
    if (
      window.screen.height > window.pageYOffset &&
      isTopButtonAvailable === true
    ) {
      setIsTopButtonAvailable(false);
    }
  });

  function onTopButtonClick() {
    window.scroll(0, 0);
  }

  function initial() {
    getStorageData("is-syncedtabs-page-open").then((result: boolean) => {
      setIsSyncedTabsPageOpen(result);
    });
  }

  function onSyncedTabsPageOpenToggle(nextState: boolean) {
    setIsSyncedTabsPageOpen(nextState);
  }

  function onHistoryPageOpenToggle(nextState: boolean) {
    setIsHistoryPageOpen(nextState);
  }

  useEffect(() => {
    whale.sidebarAction.onClicked.addListener(initial);
  }, []);

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
        <SyncedTabs
          isPageOpen={isSyncedTabsPageOpen}
          onPageOpenToggle={onSyncedTabsPageOpenToggle}
        />
        <History
          isPageOpen={isHistoryPageOpen}
          onPageOpenToggle={onHistoryPageOpenToggle}
        />
      </div>
      {isTopButtonAvailable ? <TopButton onClick={onTopButtonClick} /> : null}
    </div>
  );
}

export default App;
