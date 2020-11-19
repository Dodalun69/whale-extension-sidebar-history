import React from "react";

import * as whaleApi from "@src/util/whaleApi";
import { PageContainer } from "@src/sidebarPage/common";

import CurrentSiteHistory from "./CurrentSiteHistory";
import DateHistory from "./DateHistory";

type Props = {
  currentSiteData: {
    domain: string | null;
    historys: whale.history.HistoryItem[];
  };
  dateData: {
    today: Date;
    searchDate: Date;
    historys: whale.history.HistoryItem[];
    onSearchDateChange: (newDate: Date) => void;
  };
};

export default function HistoryView({ currentSiteData, dateData }: Props) {
  return (
    <PageContainer
      title={whaleApi.i18nGetMessage("history")}
      option={<div>{whaleApi.i18nGetMessage("history__desc")}</div>}
    >
      <CurrentSiteHistory
        domain={currentSiteData.domain}
        historys={currentSiteData.historys}
      />
      <DateHistory
        today={dateData.today}
        searchDate={dateData.searchDate}
        historys={dateData.historys}
        onSearchDateChange={dateData.onSearchDateChange}
      />
    </PageContainer>
  );
}
