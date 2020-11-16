import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { SectionContainer } from "../../common";
import * as whaleApi from "../../../util/whaleApi";
import HistoryList from "./HistoryList";

type Props = {
  currentUrl: string | null;
};

export default function CurrentSiteHistory({ currentUrl }: Props) {
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
        title={whaleApi.i18nGetMessage("history__current_site_history")}
        option={<CurrentSiteDomain>unknown</CurrentSiteDomain>}
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
      title={whaleApi.i18nGetMessage("history__current_site_history")}
      option={<CurrentSiteDomain>{urlData.domain}</CurrentSiteDomain>}
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

const CurrentSiteDomain = styled.div`
  max-width: 140px;
  font-size: var(--primary-small-font-size);
  color: var(--primary-font-light-color);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
