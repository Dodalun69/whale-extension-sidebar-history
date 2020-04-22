import React, { useState, useEffect } from "react";

import { SectionContainer } from "../../common";
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

  function updateHistoryList() {
    if (!urlData) {
      return;
    }

    whale.history.search(
      {
        text: urlData.domain,
        startTime: Date.now() - 604800000, // 3600000 * 24 * 7
        maxResults: 0,
      },
      (results: whale.history.HistoryItem[]) => {
        const filteredByUrl = results.reduce((result, history) => {
          if (result.length >= 15) {
            // 15개가 스크롤 적당한 길이인듯함
            return result;
          }
          if (history.url.startsWith(urlData.domainWithProtocol)) {
            return [history, ...result];
          }
          return result;
        }, []);

        setHistorys(filteredByUrl);
      },
    );
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
        title={
          whale.i18n.getMessage("history__current_site_history") ||
          "history__current_site_history"
        }
        option={<div className="current-site-url">unknown</div>}
      >
        <HistoryList
          historys={[]}
          fallbackMessage={
            whale.i18n.getMessage(
              "history__current_site_history__unknown_site",
            ) || "history__current_site_history__unknown_site"
          }
        />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      id="current-site-history"
      title={
        whale.i18n.getMessage("history__current_site_history") ||
        "history__current_site_history"
      }
      option={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <div className="current-site-url">{urlData.domain}</div>
      }
    >
      <HistoryList
        historys={historys}
        fallbackMessage={
          whale.i18n.getMessage(
            "history__current_site_history__no_history_data",
          ) || "history__current_site_history__no_history_data"
        }
      />
    </SectionContainer>
  );
}

export default CurrentSiteHistory;
