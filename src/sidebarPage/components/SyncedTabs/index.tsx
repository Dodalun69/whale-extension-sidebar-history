import React, { useEffect, useState } from "react";
import {
  CollapsibleSectionContainer,
  CollapsiblePageContainer,
  TabView,
} from "../../common";

import "./index.scss";

function renderDevice(device: chrome.sessions.Device) {
  // console.log("device", device);

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

async function loadDevices(): Promise<chrome.sessions.Device[]> {
  return new Promise(resolve => {
    chrome.sessions.getDevices(null, data => {
      resolve(data);
    });
  });
}

function SyncedTabs({ isPageOpen, onPageOpenToggle }: SyncedTabsProps) {
  const [syncStatus, setSyncStatus] = useState<boolean>(false);
  const [devices, setDevices] = useState<chrome.sessions.Device[]>([]);

  function sync() {
    setSyncStatus(true);

    loadDevices()
      .then((data: chrome.sessions.Device[]) => {
        setDevices(data);

        return new Promise(resolve => {
          setTimeout(() => resolve(), 500); // '동기화 중' 메세지가 너무 빨리 사라지므로 추가
        });
      })
      .then(() => {
        setSyncStatus(false);
      });
  }

  useEffect(() => {
    sync();

    whale.sidebarAction.onClicked.addListener(result => {
      // result object: https://developers.whale.naver.com/api/extensions/sidebarAction/#onClicked
      //
      // eslint-disable-next-line dot-notation
      if (result["opened"] === true) {
        sync();
      }
    });
  }, []);

  function onManualSync() {
    sync();
  }

  return (
    <CollapsiblePageContainer
      id="synced-tabs"
      title={whale.i18n.getMessage("synced_tabs") || "synced_tabs"}
      isOpen={isPageOpen}
      onToggleOpen={onPageOpenToggle}
    >
      <div id="sync-control">
        <div className="status">{syncStatus ? "동기화 중..." : ""}</div>
        <button type="button" onClick={onManualSync} disabled={syncStatus}>
          수동 동기화
        </button>
      </div>
      <div>
        {devices.length > 0 ? (
          devices.map((device, index) => [
            renderDevice(device),
            index !== devices.length - 1 ? (
              <div style={{ marginBottom: "8px" }} />
            ) : (
              <div style={{ marginBottom: "5px" }} />
            ),
          ])
        ) : (
          <div>다른 기기의 열린 탭이 없습니다.</div>
        )}
      </div>
    </CollapsiblePageContainer>
  );
}

export default SyncedTabs;
