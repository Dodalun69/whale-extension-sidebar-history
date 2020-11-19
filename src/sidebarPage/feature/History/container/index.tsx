import React, { useState, useEffect, useCallback } from "react";

import * as whaleApi from "@src/util/whaleApi";

import HistoryView from "../view";

export default function HistoryContainer() {
  const TODAY_MIDNIGHT = new Date(new Date(Date.now()).setHours(0, 0, 0, 0));
  const [currentActiveTabUrlData, setCurrentActiveTabUrlData] = useState<{
    fullUrl: string;
    domainWithProtocol: string;
    domain: string;
  } | null>(null);
  const [currentSiteHistorys, setCurrentSiteHistorys] = useState<
    whale.history.HistoryItem[]
  >([]);
  const [searchDate, setSearchDate] = useState<Date>(new Date(TODAY_MIDNIGHT));
  const [dateHistorys, setDateHistorys] = useState<whale.history.HistoryItem[]>(
    [],
  );

  async function tabsActivateListener(activeInfo: chrome.tabs.TabActiveInfo) {
    const { tabId } = activeInfo;

    const tab = await whaleApi.tabsGet(tabId);

    if (tab.url) {
      const urlData = parseUrlData(tab.url);

      setCurrentActiveTabUrlData(urlData);
    }
  }

  async function initializeCurrentActiveTab() {
    const tabs = await whaleApi.tabsQuery({
      currentWindow: true,
      active: true,
    });
    if (!(tabs && tabs[0] && tabs[0].url)) {
      console.error("현재 열린 탭 정보 가져오기 실패");
      return;
    }
    const tab = tabs[0];
    const urlData = parseUrlData(tab.url);

    setCurrentActiveTabUrlData(urlData);
  }

  const updateSpecifySiteHistorys = useCallback(async () => {
    if (!currentActiveTabUrlData) {
      return;
    }
    const historys = await getHistoryOfSpecifyDomain(
      currentActiveTabUrlData.domain,
      currentActiveTabUrlData.domainWithProtocol,
    );

    setCurrentSiteHistorys(historys);
  }, [currentActiveTabUrlData]);

  const updateSpecifyDateHistorys = useCallback(async () => {
    const historys = await getHistoryOfSpecifyDate(searchDate);

    setDateHistorys(historys);
  }, [searchDate]);

  useEffect(() => {
    whale.tabs.onActivated.addListener(tabsActivateListener);

    initializeCurrentActiveTab();
    whaleApi.sidebarActionOnClickedAddListener(true, () =>
      initializeCurrentActiveTab(),
    );
  }, []);

  useEffect(() => {
    updateSpecifySiteHistorys();
    whale.history.onVisited.addListener(updateSpecifySiteHistorys);
    return () => {
      whale.history.onVisited.removeListener(updateSpecifySiteHistorys);
    };
  }, [currentActiveTabUrlData]);

  useEffect(() => {
    updateSpecifyDateHistorys();
    whale.history.onVisited.addListener(updateSpecifyDateHistorys);

    return () => {
      whale.history.onVisited.removeListener(updateSpecifyDateHistorys);
    };
  }, [searchDate]);

  function onSearchDateChange(newDate: Date) {
    setSearchDate(newDate);
  }

  return (
    <HistoryView
      currentSiteData={{
        domain: currentActiveTabUrlData ? currentActiveTabUrlData.domain : null,
        historys: currentSiteHistorys,
      }}
      dateData={{
        today: TODAY_MIDNIGHT,
        searchDate,
        historys: dateHistorys,
        onSearchDateChange,
      }}
    />
  );
}

function parseUrlData(url: string) {
  const regResult = /.*?:\/\/(.*?)\//g.exec(url);

  const result = {
    fullUrl: url,
    domainWithProtocol: regResult[0] || url,
    domain: regResult[1] || url,
  };

  return result;
}

async function getHistoryOfSpecifyDomain(
  domain: string,
  domainWithProtocol: string,
) {
  const results = await whaleApi.historySearch({
    text: domain,
    startTime: Date.now() - 604800000, // 3600000 * 24 * 7
    maxResults: 0,
  });
  const filteredByUrl = results.reduce((result, history) => {
    if (result.length >= 15) {
      // 15개가 스크롤 적당한 길이인듯함
      return result;
    }
    if (history.url.startsWith(domainWithProtocol)) {
      return [...result, history];
    }
    return result;
  }, []);

  return filteredByUrl;
}

async function getHistoryOfSpecifyDate(searchDate: Date) {
  const startTime = searchDate.getTime();
  const endDate = new Date(startTime);
  endDate.setDate(endDate.getDate() + 1);

  const results = await whaleApi.historySearch({
    text: "",
    maxResults: 0,
    startTime,
    endTime: endDate.getTime(),
  });

  return results;
}
