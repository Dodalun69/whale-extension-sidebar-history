import React, { useEffect, useState } from "react";
import { PageContainer } from "../../common";
import Device from "./Device";

import "./index.scss";

async function loadDevices(): Promise<chrome.sessions.Device[]> {
  return new Promise(resolve => {
    chrome.sessions.getDevices(null, data => {
      resolve(data);
    });
  });
}

function SyncedTabs() {
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
      })
      .catch(error => {
        console.error("SyncedTabs LoadDevice False", error);

        setDevices([]);
        setSyncStatus(false);
        // To do: 에러 발생 시 에러문구 설정하기
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
    <PageContainer
      id="synced-tabs"
      title={whale.i18n.getMessage("synced_tabs") || "synced_tabs"}
      desc={whale.i18n.getMessage("synced_tabs__desc") || "synced_tabs__desc"}
    >
      <div id="sync-control">
        <button type="button" onClick={onManualSync} disabled={syncStatus}>
          {syncStatus
            ? whale.i18n.getMessage("synced_tabs__synchronizing") ||
              "synced_tabs__synchronizing"
            : whale.i18n.getMessage("synced_tabs__manual_sync") ||
              "synced_tabs__manual_sync"}
        </button>
      </div>
      <div className="content">
        {devices.length > 0 ? (
          devices.map((device, index) => [
            <Device device={device} />,
            index !== devices.length - 1 ? (
              <div style={{ marginBottom: "12px" }} />
            ) : null,
          ])
        ) : (
          <div className="announcement">
            <div>
              {whale.i18n.getMessage("synced_tabs__no_synced_tabs") ||
                "synced_tabs__no_synced_tabs"}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default SyncedTabs;
