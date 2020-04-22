import React, { useState } from "react";
import HistoryItem from "./HistoryItem";

import "./HistoryList.scss";

type HistoryListProps = {
  historys: whale.history.HistoryItem[];
  fallbackMessage: string;
};

function HistoryList({ historys, fallbackMessage }: HistoryListProps) {
  // 방문 기록 데이터가 비어있을 경우 처리
  if (!(historys && historys.length > 0)) {
    return <div id="history-list-announcement">{fallbackMessage}</div>;
  }

  // To do: 2.0.0 먼저 올리고 2.1.X에 추가하기
  //
  // let hour = -1;
  // let flag = false;
  // function renderHistory(history: whale.history.HistoryItem) {
  //   const { lastVisitTime } = history;
  //   const time = new Date(lastVisitTime);

  //   if (hour !== time.getHours()) {
  //     if (hour !== -1) {
  //       flag = true;
  //     }
  //     hour = time.getHours();
  //   }

  //   const result = [
  //     <HistoryItem key={history.id} history={history} />,
  //     flag ? (
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "center",
  //           marginTop: "12px",
  //           marginBottom: "12px",
  //         }}
  //       >
  //         <hr />
  //         <div style={{ width: "60px" }}>{hour}</div>
  //         <hr />
  //       </div>
  //     ) : null,
  //   ];

  //   flag = false;

  //   return result;
  // }

  // console.log("historyList", "render", historys.length);

  // return (
  //   <div id="history-list">
  //     {historys.map((history) => renderHistory(history))}
  //   </div>
  // );

  return (
    <div id="history-list">
      {historys.map(history => (
        <HistoryItem key={history.id} history={history} />
      ))}
    </div>
  );
}

export default HistoryList;
