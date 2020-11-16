import React from "react";
import LinkContainer from "../../common/LinkContainer";

type Props = {
  history: whale.history.HistoryItem;
};

export default function HistoryItem({ history }: Props) {
  const { title, url } = history;

  return <LinkContainer title={title} url={url} />;
}
