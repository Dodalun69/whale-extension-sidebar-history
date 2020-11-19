import React from "react";

import { SectionContainer } from "@src/sidebarPage/common";
import * as whaleApi from "@src/util/whaleApi";
import DateSelector from "./DateSelector";
import HistoryList from "./HistoryList";

type Props = {
  today: Date;
  searchDate: Date;
  historys: whale.history.HistoryItem[];
  onSearchDateChange: (newDate: Date) => void;
};

export default function DateHistory({
  today,
  searchDate,
  historys,
  onSearchDateChange,
}: Props) {
  function onDateSelectorChange(date: Date) {
    onSearchDateChange(date);
  }

  return (
    <SectionContainer
      title={whaleApi.i18nGetMessage("history__entire_history")}
      option={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <DateSelector TODAY={today.getTime()} onSelect={onDateSelectorChange} />
      }
      collapsibleConfigure={{
        defaultStatus: true,
        isFixed: true,
      }}
    >
      <HistoryList
        historys={historys}
        fallbackMessage={whaleApi.i18nGetMessage(
          "history__entire_history__no_history_data",
        )}
        timeLineInfo={{ baseDay: searchDate.getDate() }}
      />
    </SectionContainer>
  );
}
