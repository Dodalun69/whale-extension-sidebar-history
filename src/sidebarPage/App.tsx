import React, { useState, useEffect } from "react";

import "./global.scss";
import "./App.scss";

import Announcement from "./components/Announcement";
import SyncedTabs from "./components/SyncedTabs";
import History from "./components/History";
import TopButton from "./components/TopButton";

import { Key, getStorageData, setStorageData } from "./storage";

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
    getStorageData(Key.isSyncedTabsPageOpen)
      .then((result: boolean) => {
        setIsSyncedTabsPageOpen(result);
      })
      .catch((error: Error) => {
        if (error.message === "undefined") {
          // 아직 값이 지정되지 않음(신규 설치)
          setIsSyncedTabsPageOpen(true);
        }
      });
    getStorageData(Key.isHistoryPageOpen)
      .then((result: boolean) => {
        setIsHistoryPageOpen(result);
      })
      .catch((error: Error) => {
        if (error.message === "undefined") {
          // 아직 값이 지정되지 않음(신규 설치)
          setIsHistoryPageOpen(true);
        }
      });
  }
  function onSyncedTabsPageOpenToggle(nextState: boolean) {
    setStorageData(Key.isSyncedTabsPageOpen, nextState)
      // eslint-disable-next-line no-console
      .catch(err => console.error(err))
      .finally(() => {
        setIsSyncedTabsPageOpen(nextState);
      });
  }

  function onHistoryPageOpenToggle(nextState: boolean) {
    setStorageData(Key.isHistoryPageOpen, nextState)
      // eslint-disable-next-line no-console
      .catch(err => console.error(err))
      .finally(() => {
        setIsHistoryPageOpen(nextState);
      });
  }

  useEffect(() => {
    initial();

    whale.sidebarAction.onClicked.addListener(result => {
      // result object: https://developers.whale.naver.com/api/extensions/sidebarAction/#onClicked
      //
      // eslint-disable-next-line dot-notation
      if (result["opened"] === true) {
        initial();
      }
    });
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
