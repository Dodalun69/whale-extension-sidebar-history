import React from "react";
import styled from "styled-components";
import * as whaleApi from "@src/util/whaleApi";
import { PageContainer } from "@src/sidebarPage/common";

import Device from "./Device";

type Props = {
  syncStatus: boolean;
  devices: chrome.sessions.Device[];
  onManualSync: () => void;
  errorMessage: string;
};

export default function SyncedTabsView({
  syncStatus,
  devices,
  onManualSync,
  errorMessage,
}: Props) {
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
