import React from "react";

import "./index.scss";

type HistoryItemViewProps = {
  title?: string;
  url: string;
};

function HistoryItemView({ title, url }: HistoryItemViewProps) {
  return (
    <div className="history-item-view">
      <a
        href={url}
        title={title || url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="title">{title || url}</div>
      </a>
    </div>
  );
}

export default HistoryItemView;
