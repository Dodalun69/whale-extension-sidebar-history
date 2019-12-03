import React from "react";
import { HistoryItemView } from "../../common";

import "./HistoryList.scss";

type HistoryListProps = {
  historys: whale.history.HistoryItem[];
};

function HistoryList({ historys }: HistoryListProps) {
  // 방문 기록 데이터가 비어있을 경우 처리
  if (!(historys && historys.length > 0)) {
    return (
      <div className="announcement">
        {whale.i18n.getMessage("history__no_history_data")}
      </div>
    );
  }

  return (
    <div id="history-list">
      {historys.map(({ title, url }) => (
        <HistoryItemView title={title} url={url} />
      ))}
    </div>
  );
}

export default HistoryList;
