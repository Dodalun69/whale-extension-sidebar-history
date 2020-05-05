import React, { useState, useEffect } from "react";

import { SectionContainer } from "../../common";
import * as whaleApi from "../../../util/whaleApi";
import HistoryList from "./HistoryList";

import "./CurrentSiteHistory.scss";

type Props = {
  currentUrl: string | null;
};

function CurrentSiteHistory({ currentUrl }: Props) {
  const [urlData, setUrlData] = useState<{
    fullUrl: string;
    domainWithProtocol: string;
    domain: string;
  } | null>(null);
  const [historys, setHistorys] = useState<whale.history.HistoryItem[]>([]);

  async function updateHistoryList() {
    if (!urlData) {
      return;
    }
    const results = await whaleApi.historySearch({
      text: urlData.domain,
      startTime: Date.now() - 604800000, // 3600000 * 24 * 7
      maxResults: 0,
    });
    const filteredByUrl = results.reduce((result, history) => {
      if (result.length >= 15) {
        // 15개가 스크롤 적당한 길이인듯함
        return result;
      }
      if (history.url.startsWith(urlData.domainWithProtocol)) {
        return [...result, history];
      }
      return result;
    }, []);

    setHistorys(filteredByUrl);
  }

  useEffect(() => {
    whale.history.onVisited.addListener(() => {
      updateHistoryList();
    });
  }, []);

  useEffect(() => {
    if (currentUrl === null) {
      return;
    }

    const regResult = /.*?:\/\/(.*?)\//g.exec(currentUrl);

    setUrlData({
      fullUrl: currentUrl,
      domainWithProtocol: regResult[0] || currentUrl,
      domain: regResult[1] || currentUrl,
    });
  }, [currentUrl]);

  useEffect(() => {
    updateHistoryList();
  }, [urlData]);

  if (currentUrl === null || urlData === null) {
    return (
      <SectionContainer
        id="current-site-history"
        title={whaleApi.i18nGetMessage("history__current_site_history")}
        option={<div className="current-site-url">unknown</div>}
      >
        <HistoryList
          historys={[]}
          fallbackMessage={whaleApi.i18nGetMessage(
            "history__current_site_history__unknown_site",
          )}
        />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      id="current-site-history"
      title={whaleApi.i18nGetMessage("history__current_site_history")}
      option={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <div className="current-site-url">{urlData.domain}</div>
      }
    >
      <HistoryList
        historys={historys}
        fallbackMessage={whaleApi.i18nGetMessage(
          "history__current_site_history__no_history_data",
        )}
      />
    </SectionContainer>
  );
}

export default CurrentSiteHistory;
