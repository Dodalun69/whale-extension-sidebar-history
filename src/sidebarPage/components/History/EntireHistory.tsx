import React, { useState, useEffect } from "react";

import { SectionContainer } from "../../common";
import * as whaleApi from "../../../util/whaleApi";
import DateSelector from "./DateSelector";
import HistoryList from "./HistoryList";

function EntireHistory() {
  const TODAY_MIDNIGHT = new Date(new Date(Date.now()).setHours(0, 0, 0, 0));
  // history.search 에 쓰일 startDate (startDate 이후 기록만 검색됨)
  const [startDate, setStartDate] = useState<Date>(new Date(TODAY_MIDNIGHT));
  const [historys, setHistorys] = useState<whale.history.HistoryItem[]>([]);

  async function updateHistoryList(startTime: number) {
    const endDate = new Date(startTime);
    endDate.setDate(endDate.getDate() + 1);

    const results = await whaleApi.historySearch({
      text: "",
      maxResults: 0,
      startTime,
      endTime: endDate.getTime(),
    });
    setHistorys(results);
  }

  function visitUpdateListener() {
    updateHistoryList(startDate.getTime());
  }

  useEffect(() => {
    updateHistoryList(startDate.getTime());

    whale.history.onVisited.addListener(visitUpdateListener);

    return () => {
      whale.history.onVisited.removeListener(visitUpdateListener);
    };
  }, [startDate]);

  function onStartDateChange(date: Date) {
    setStartDate(date);
  }

  return (
    <SectionContainer
      id="entire-history"
      title={whaleApi.i18nGetMessage("history__entire_history")}
      option={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <DateSelector
          TODAY={TODAY_MIDNIGHT.getTime()}
          onSelect={onStartDateChange}
        />
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
        timeLineInfo={{ baseDay: startDate.getDate() }}
      />
    </SectionContainer>
  );
}

export default EntireHistory;
