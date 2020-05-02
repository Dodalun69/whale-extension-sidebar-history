import React, { useState, useEffect } from "react";

import { PageContainer } from "../../common";
import * as whaleApi from "../../../util/whaleApi";
import CurrentSiteHistory from "./CurrentSiteHistory";
import EntireHistory from "./EntireHistory";

function History() {
  const [currentActiveTabUrl, setCurrentActiveTabUrl] = useState<string | null>(
    null,
  );

  async function tabsActivateListener(activeInfo: chrome.tabs.TabActiveInfo) {
    const { tabId } = activeInfo;

    const tab = await whaleApi.tabsGet(tabId);

    if (tab.url) {
      setCurrentActiveTabUrl(tab.url);
    }
  }

  async function initial() {
    const tabs = await whaleApi.tabsQuery({
      currentWindow: true,
      active: true,
    });
    if (!(tabs && tabs[0] && tabs[0].url)) {
      console.error("현재 열린 탭 정보 가져오기 실패");
      return;
    }
    const tab = tabs[0];
    setCurrentActiveTabUrl(tab.url);
  }

  useEffect(() => {
    whale.tabs.onActivated.addListener(tabsActivateListener);

    initial();
    whaleApi.sidebarActionOnClickedAddListener(true, () => initial());
  }, []);

  return (
    <PageContainer
      id="history"
      title={whaleApi.i18nGetMessage("history")}
      desc={whaleApi.i18nGetMessage("history__desc")}
    >
      <CurrentSiteHistory currentUrl={currentActiveTabUrl} />
      <div style={{ marginBottom: "12px" }} />
      <EntireHistory />
    </PageContainer>
  );
}

export default History;
