import React, { useEffect, useState } from "react";
import { PageContainer } from "../../common";
import * as whaleApi from "../../../util/whaleApi";
import Device from "./Device";

import "./index.scss";

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
        throw new Error();
      }
      const tab = tabs[0];
      if (tab.incognito) {
        setErrorMessage(
          whaleApi.i18nGetMessage("synced_tabs__not_available_in_incognito"),
        );
        throw new Error();
      }
      const data = await whaleApi.sessionsGetDevices(null);

      setDevices(data);

      await new Promise(resolve => {
        setTimeout(() => resolve(), 500); // '동기화 중' 메세지가 너무 빨리 사라지므로 추가
      });
      setErrorMessage(whaleApi.i18nGetMessage("synced_tabs__no_synced_tabs"));

      setSyncStatus(false);
    } catch (error) {
      console.error("SyncedTabs LoadDevice False", error);
      // setErrorMessage(
      //   whaleApi.i18nGetMessage("synced_tabs__error")
      // );
      setDevices([]);
      setSyncStatus(false);
      // To do: 에러 발생 시 에러문구 설정하기
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
