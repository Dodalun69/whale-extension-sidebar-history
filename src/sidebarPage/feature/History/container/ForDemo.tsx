import React from "react";

import HistoryView from "../view";

export default function HistoryContainerForDemo() {
  const TODAY_MIDNIGHT = new Date(new Date(Date.now()).setHours(0, 0, 0, 0));

  const currentActiveTabUrlData = {
    fullUrl: "https://www.google.co.kr/",
    domainWithProtocol: "https://www.google.co.kr/",
    domain: "www.google.co.kr",
  };
  const currentSiteHistorys = createDummyHistoryItems(
    {
      title: "Google",
      url: "https://www.google.co.kr/",
    },
    5,
  );

  const searchDate = new Date(TODAY_MIDNIGHT);
  const dateHistorys = createDummyHistoryItems(
    {
      title: "Google",
      url: "https://www.google.co.kr/",
    },
    20,
  );

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
        onSearchDateChange: () => {},
      }}
    />
  );
}

function createDummyHistoryItem(
  title: string,
  url: string,
  lastVisitTime: number,
): whale.history.HistoryItem {
  const id = Math.random().toString(36).substring(7);

  const result: whale.history.HistoryItem = {
    id,
    title,
    url,
    lastVisitTime,
    visitCount: 10,
    typedCount: 1,
  };

  return result;
}

function createDummyHistoryItems(
  historyData: {
    title: string;
    url: string;
  },
  count: number,
): whale.history.HistoryItem[] {
  const { title, url } = historyData;

  const result = new Array(count).fill(null).map((_, index) => {
    const lastVisitTime = new Date(Date.now()).setHours(
      0,
      20 * (count - index), // 3개당 1시간씩 나눠지도록
      0,
      0,
    );
    const historyItem = createDummyHistoryItem(title, url, lastVisitTime);

    return historyItem;
  });

  return result;
}
