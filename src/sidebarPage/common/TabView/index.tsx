import React from "react";
import LinkContainer from "../LinkContainer";

type TabViewProps = {
  tab: whale.tabs.Tab;
};

function TabView({ tab }: TabViewProps) {
  const { title, url, favIconUrl } = tab;

  return <LinkContainer title={title} url={url} favIconUrl={favIconUrl} />;
}

export default TabView;
