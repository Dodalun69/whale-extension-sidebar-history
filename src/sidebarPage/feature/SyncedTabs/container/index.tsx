import React, { useEffect, useState } from "react";
import * as whaleApi from "@src/util/whaleApi";

import SyncedTabsView from "../view";

class TabSyncError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TabSyncError";
  }
}

export default function SyncedTabsContainer() {
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
      await new Promise((resolve) => {
        setTimeout(() => resolve(), 500);
      });
    } catch (error) {
      if (error instanceof TabSyncError) {
        setDevices([]);
        setErrorMessage(error.message);
      } else {
        console.error("SyncedTabs LoadDevice False", error);
        setDevices([]);
        setErrorMessage(whaleApi.i18nGetMessage("synced_tabs__error"));
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
    <SyncedTabsView
      syncStatus={syncStatus}
      devices={devices}
      errorMessage={errorMessage}
      onManualSync={onManualSync}
    />
  );
}
