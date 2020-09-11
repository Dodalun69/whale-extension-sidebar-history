import React from "react";
import HistoryItem from "./HistoryItem";

import "./HistoryList.scss";

type HistoryListProps = {
  historys: whale.history.HistoryItem[];
  fallbackMessage: string;
  timeLineInfo?: {
    baseDay: number;
  };
};

function TimeLineHistory({
  timeLineInfo,
  historys,
}: {
  timeLineInfo: {
    baseDay: number;
  };
  historys: whale.history.HistoryItem[];
}) {
  const timeFlag = {
    hour: -1,
    prevHour: -1,
    flag: false,
  };

  function renderTimeDivider(time: number) {
    return (
      <div className="time-divider">
        <hr />
        <div>{`${time < 10 ? `0${time}` : time} : 00`}</div>
        <hr />
      </div>
    );
  }

  function renderHistory(history: whale.history.HistoryItem) {
    const { lastVisitTime } = history;
    const time = new Date(lastVisitTime);

    if (
      time.getDate() === timeLineInfo.baseDay &&
      timeFlag.hour !== time.getHours()
    ) {
      timeFlag.hour = time.getHours();

      if (timeFlag.prevHour !== timeFlag.hour && timeFlag.prevHour !== -1) {
        timeFlag.flag = true;
      }
    }

    const result = [
      timeFlag.flag ? renderTimeDivider(timeFlag.prevHour) : null,
      <HistoryItem key={history.id} history={history} />,
    ];

    timeFlag.flag = false;
    timeFlag.prevHour = timeFlag.hour;

    return result;
  }

  return (
    <div id="history-list">
      {historys.map((history) => renderHistory(history))}
      {renderTimeDivider(timeFlag.prevHour)}
    </div>
  );
}

function HistoryList({
  historys,
  fallbackMessage,
  timeLineInfo,
}: HistoryListProps) {
  if (!(historys && historys.length > 0)) {
    return <div id="history-list-announcement">{fallbackMessage}</div>;
  }

  if (timeLineInfo) {
    return <TimeLineHistory timeLineInfo={timeLineInfo} historys={historys} />;
  }

  return (
    <div id="history-list">
      {historys.map((history) => (
        <HistoryItem key={history.id} history={history} />
      ))}
    </div>
  );
}

export default HistoryList;
