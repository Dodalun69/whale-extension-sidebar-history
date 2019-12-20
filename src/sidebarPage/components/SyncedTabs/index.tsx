import React, { useEffect, useState } from "react";
import { SectionContainer, PageContainer, TabView } from "../../common";

function renderDevice(device: chrome.sessions.Device) {
  return (
    <SectionContainer title={device.deviceName}>
      {device.sessions.map(session => (
        <div>
          {session.window.tabs.map(tab => (
            <TabView key={tab.id} tab={tab} />
          ))}
        </div>
      ))}
    </SectionContainer>
  );
}

function SyncedTabs() {
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
    <PageContainer
      id="synced-tabs"
      title={whale.i18n.getMessage("synced_tabs") || "synced_tabs"}
    >
      {devices.map(device => renderDevice(device))}
    </PageContainer>
  );
}

export default SyncedTabs;
