import React from "react";
import styled from "styled-components";
import { SectionContainer } from "@src/sidebarPage/common";
import TabItem from "./TabItem";

function Session({ session }: { session: chrome.sessions.Session }) {
  // const { lastModified } = session;
  const { tabs: originalTabs } = session.window;

  const detailTabs: {
    tabIndex: number;
    tabSessionId: string;
    tab: chrome.tabs.Tab;
  }[] = originalTabs.map((tab) => {
    // sessionId e.g.: "session_syncfed12as3-asd1-1a2s-asd1-a1sd2f345fg6.397"
    const { sessionId: tabSessionId } = tab;

    let tabIndex = 0;
    try {
      const tabIndexStr: string = tabSessionId.substr(
        tabSessionId.lastIndexOf(".") + 1,
      );
      tabIndex = Number.parseInt(tabIndexStr, 10);

      if (Number.isNaN(tabIndex)) {
        throw new Error(`tabIndex is NaN (sessionId: "${tabSessionId}")`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);

      tabIndex = 0;
    }

    return { tabIndex, tabSessionId, tab };
  });

  detailTabs.sort((a, b) => a.tabIndex - b.tabIndex);
  return (
    <div className="session">
      {detailTabs.map(({ tabSessionId, tab }) => (
        <TabItem key={tabSessionId} tab={tab} />
      ))}
    </div>
  );
}

function getTimeDiffMessage(timeDiff: number): string {
  const ONE_HOUR = 3600000; // 1000 * 60 * 60

  const day = timeDiff / (ONE_HOUR * 24);
  if (day >= 1) {
    return `${Math.round(day)}${
      whale.i18n.getMessage("general__day") || "general__day"
    }`;
  }

  const hour = (timeDiff % (ONE_HOUR * 24)) / ONE_HOUR;
  if (hour >= 1) {
    return `${Math.round(hour)}${
      whale.i18n.getMessage("general__hour") || "general__hour"
    }`;
  }

  const min = (timeDiff % ONE_HOUR) / (1000 * 60);
  if (min >= 1) {
    return `${Math.round(min)}${
      whale.i18n.getMessage("general__minute") || "general__minute"
    }`;
  }

  const sec = (timeDiff % (1000 * 60)) / 1000;

  return `${Math.round(sec)}${
    whale.i18n.getMessage("general__second") || "general__second"
  }`;
}

type Props = {
  device: chrome.sessions.Device;
};

export default function Device({ device }: Props) {
  const { deviceName, sessions: originalSessions } = device;

  const lastModified =
    originalSessions[0] && originalSessions[0].lastModified
      ? originalSessions[0].lastModified
      : 0;

  const timeDiff = Date.now() - lastModified * 1000;

  return (
    <SectionContainer
      title={deviceName}
      option={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <LastUpdateTime>
          {`${getTimeDiffMessage(timeDiff)} ${
            whale.i18n.getMessage("general__ago") || "general__ago"
          }`}
        </LastUpdateTime>
      }
      collapsibleConfigure={{
        defaultStatus: timeDiff < 3600000,
      }}
      // 최근 수정된 시간 1시간 내인 경우만 기본으로 열어두기
    >
      {originalSessions.map((session, index) => [
        <Session key={session.window.sessionId} session={session} />,
        index !== originalSessions.length - 1 ? (
          <SessionDivider>
            <hr />
          </SessionDivider>
        ) : null,
      ])}
    </SectionContainer>
  );
}

const LastUpdateTime = styled.div`
  font-size: var(--primary-small-font-size);
  color: var(--primary-font-light-color);
`;

const SessionDivider = styled.div`
  padding-top: 12px;
  padding-bottom: 12px;

  padding-left: 40px;
  padding-right: 40px;
`;
