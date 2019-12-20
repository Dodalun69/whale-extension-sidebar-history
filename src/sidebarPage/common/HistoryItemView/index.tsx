import React from "react";
import LinkContainer from "../LinkContainer";

// import "./index.scss";

type HistoryItemViewProps = {
  history: whale.history.HistoryItem;
};

function HistoryItemView({ history }: HistoryItemViewProps) {
  const { title, url } = history;

  return <LinkContainer title={title} url={url} />;
}

export default HistoryItemView;
