import React, { useEffect, useState } from "react";
import { PageContainer } from "../../common";
import * as whaleApi from "../../../util/whaleApi";
import Device from "./Device";

import "./index.scss";

class TabSyncError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TabSyncError";
  }
}

function SyncedTabs() {
  const [syncStatus, setSyncStatus] = useState<boolean>(false);
  const [devices, setDevices] = useState<chrome.sessions.Device[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function sync() {
    setSyncStatus(true);

    try {
      const tabs = await whaleApi.tabsQuery({
        currentWindow: true,
        active: true,
      });

      if (!(tabs && tabs[0] && tabs[0].url)) {
        throw new TabSyncError(whaleApi.i18nGetMessage("synced_tabs__error"));
      } else if (tabs[0].incognito) {
        throw new TabSyncError(
          whaleApi.i18nGetMessage("synced_tabs__not_available_in_incognito"),
        );
      }

      const data = await whaleApi.sessionsGetDevices(null);

      setDevices(data);

      if (data.length === 0) {
        throw new TabSyncError(
          whaleApi.i18nGetMessage("synced_tabs__no_synced_tabs"),
        );
      }

      // '동기화 중' 메세지가 너무 빨리 사라지므로 추가
      await new Promise(resolve => {
        setTimeout(() => resolve(), 500);
      });
    } catch (error) {
      if (error instanceof TabSyncError) {
        setDevices([]);
        setErrorMessage(error.message);
      } else {
        console.error("SyncedTabs LoadDevice False", error);
      }
    } finally {
      setSyncStatus(false);
    }
  }

  useEffect(() => {
    sync();

    whaleApi.sidebarActionOnClickedAddListener(true, () => sync());
  }, []);

  function onManualSync() {
    sync();
  }

  return (
    <PageContainer
      id="synced-tabs"
      title={whaleApi.i18nGetMessage("synced_tabs")}
      desc={whaleApi.i18nGetMessage("synced_tabs__desc")}
    >
      <div id="sync-control">
        <button type="button" onClick={onManualSync} disabled={syncStatus}>
          {syncStatus
            ? whaleApi.i18nGetMessage("synced_tabs__synchronizing")
            : whaleApi.i18nGetMessage("synced_tabs__manual_sync")}
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
            <div>{errorMessage}</div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default SyncedTabs;
