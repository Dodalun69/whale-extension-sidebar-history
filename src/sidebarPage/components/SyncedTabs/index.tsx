import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PageContainer } from "../../common";
import * as whaleApi from "../../../util/whaleApi";
import Device from "./Device";

class TabSyncError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TabSyncError";
  }
}

export default function SyncedTabs() {
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
    <PageContainer
      title={whaleApi.i18nGetMessage("synced_tabs")}
      option={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <OptionWrapper>
          <div>{whaleApi.i18nGetMessage("synced_tabs__desc")}</div>
          <ManualSyncButton
            type="button"
            onClick={onManualSync}
            disabled={syncStatus}
          >
            {syncStatus
              ? whaleApi.i18nGetMessage("synced_tabs__synchronizing")
              : whaleApi.i18nGetMessage("synced_tabs__manual_sync")}
          </ManualSyncButton>
        </OptionWrapper>
      }
    >
      <div className="content">
        {devices.length > 0 ? (
          devices.map((device) => <Device device={device} />)
        ) : (
          <FallbackAnnouncement>
            <div>{errorMessage}</div>
          </FallbackAnnouncement>
        )}
      </div>
    </PageContainer>
  );
}

const OptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ManualSyncButton = styled.button`
  all: unset;

  text-decoration: underline;
  color: var(--primary-font-light-color);
  font-family: inherit;

  &:disabled,
  &[disabled] {
    /* text-decoration: none; */
  }
`;

const FallbackAnnouncement = styled.div`
  background-color: var(--primary-background-color);
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 8px;
  padding-right: 8px;

  height: 22px;

  font-size: var(--primary-small-font-size);
  color: var(--primary-font-light-color);

  display: flex;
  align-items: center;
`;
