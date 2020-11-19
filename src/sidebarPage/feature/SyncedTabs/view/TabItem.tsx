import React from "react";
import { LinkContainer } from "@src/sidebarPage/common";

type Props = {
  tab: whale.tabs.Tab;
};

function TabItem({ tab }: Props) {
  const { title, url, favIconUrl } = tab;

  return <LinkContainer title={title} url={url} favIconUrl={favIconUrl} />;
}

export default TabItem;
