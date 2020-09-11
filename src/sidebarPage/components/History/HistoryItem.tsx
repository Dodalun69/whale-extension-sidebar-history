import React from "react";
import LinkContainer from "../../common/LinkContainer";

type Props = {
  history: whale.history.HistoryItem;
};

function HistoryItem({ history }: Props) {
  const { title, url } = history;

  return (
    <div className="history-item">
      <LinkContainer title={title} url={url} />
    </div>
  );
}

export default HistoryItem;
