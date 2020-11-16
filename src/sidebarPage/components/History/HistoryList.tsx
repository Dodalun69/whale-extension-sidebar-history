import React from "react";
import styled from "styled-components";
import HistoryItem from "./HistoryItem";

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
      <TimeDivider>
        <hr />
        <div>{`${time < 10 ? `0${time}` : time} : 00`}</div>
        <hr />
      </TimeDivider>
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

const TimeDivider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 12px;

  div {
    text-align: center;
    width: 60px;
    font-size: var(--primary-small-font-size);
    color: var(--primary-font-light-color);
  }

  hr {
    width: 100px;
  }
`;

export default function HistoryList({
  historys,
  fallbackMessage,
  timeLineInfo,
}: HistoryListProps) {
  if (!(historys && historys.length > 0)) {
    return <FallbackAnnouncement>{fallbackMessage}</FallbackAnnouncement>;
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

const FallbackAnnouncement = styled.div`
  padding-left: 8px;
  padding-right: 8px;

  font-size: var(--primary-small-font-size);
  color: var(--primary-font-light-color);
`;
