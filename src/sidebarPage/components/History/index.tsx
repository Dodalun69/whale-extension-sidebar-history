import React, { useState, useEffect } from "react";

import { PageContainer } from "../../common";
import CurrentSiteHistory from "./CurrentSiteHistory";
import EntireHistory from "./EntireHistory";

function History() {
  const [currentActiveTabUrl, setCurrentActiveTabUrl] = useState<string | null>(
    null,
  );

  function tabsActivateListener(activeInfo: chrome.tabs.TabActiveInfo) {
    const { tabId } = activeInfo;

    whale.tabs.get(tabId, tab => {
      if (tab.url) {
        setCurrentActiveTabUrl(tab.url);
      }
    });
  }

  function initial() {
    whale.tabs.query({ currentWindow: true, active: true }, tabs => {
      if (!(tabs && tabs[0] && tabs[0].url)) {
        console.error("현재 열린 탭 정보 가져오기 실패");
        return;
      }
      const tab = tabs[0];
      setCurrentActiveTabUrl(tab.url);
    });
  }

  useEffect(() => {
    whale.tabs.onActivated.addListener(tabsActivateListener);

    initial();

    whale.sidebarAction.onClicked.addListener(result => {
      // eslint-disable-next-line dot-notation
      if (result["opened"] === true) {
        initial();
      }
    });
  }, []);

  return (
    <PageContainer
      id="history"
      title={whale.i18n.getMessage("history") || "history"}
      desc={whale.i18n.getMessage("history__desc") || "history__desc"}
    >
      <CurrentSiteHistory currentUrl={currentActiveTabUrl} />
      <div style={{ marginBottom: "12px" }} />
      <EntireHistory />
    </PageContainer>
  );
}

export default History;
