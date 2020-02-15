import React, { useEffect, useState } from "react";
import {
  CollapsibleSectionContainer,
  CollapsiblePageContainer,
  TabView,
} from "../../common";

function renderDevice(device: chrome.sessions.Device) {
  console.log("device", device);

  return (
    <CollapsibleSectionContainer title={device.deviceName}>
      {device.sessions.map(session => (
        <div>
          {session.window.tabs.map(tab => (
            <TabView key={tab.id} tab={tab} />
          ))}
        </div>
      ))}
    </CollapsibleSectionContainer>
  );
}

type SyncedTabsProps = {
  isPageOpen: boolean;
  onPageOpenToggle: (nextState: boolean) => void;
};

function SyncedTabs({ isPageOpen, onPageOpenToggle }: SyncedTabsProps) {
  const [devices, setDevices] = useState<chrome.sessions.Device[]>([]);

  const loadDevices = () => {
    chrome.sessions.getDevices(null, data => {
      setDevices(data);
    });
  };
  useEffect(() => {
    loadDevices();
  }, []);

  return (
    <CollapsiblePageContainer
      id="synced-tabs"
      title={whale.i18n.getMessage("synced_tabs") || "synced_tabs"}
      isOpen={isPageOpen}
      onToggleOpen={onPageOpenToggle}
    >
      <hr />
      <div>
        {devices.map((device, index) => [
          renderDevice(device),
          index !== devices.length - 1 ? (
            <div style={{ marginBottom: "8px" }} />
          ) : (
            <div style={{ marginBottom: "5px" }} />
          ),
        ])}
      </div>
    </CollapsiblePageContainer>
  );
}

export default SyncedTabs;
