import React from "react";

import SyncedTabsView from "../view";

export default function SyncedTabsContainer() {
  const syncStatus = false;

  const devices: chrome.sessions.Device[] = [];

  // sessionId ex)
  // session_syncfed12as3-asd1-1a2s-asd1-a1sd2f345fg6.397
  devices.push(
    createDummyDevice("SM-G970N", 3600000 / 2, [
      createWindow(
        [
          createDummyTabItem(
            "사이드바 방문 기록: 웨일 스토어",
            "https://store.whale.naver.com/detail/aomdaciidffjjcoeeammnhbahiopjelm",
            "session_syncfed12as3-asd1-1a2s-asd1-a1sd2f345fg6.397",
          ),
          createDummyTabItem(
            `mate131909/whale-extension-sidebar-history: 웨일브라우저용 "사이드바 방문 기록" 확장앱`,
            "https://github.com/mate131909/whale-extension-sidebar-history",
            "session_syncfed12as3-asd1-1a2s-asd1-a1sd2f345fg6.397",
          ),
          createDummyTabItem(
            "mate131909 (MATE)",
            "https://github.com/mate131909",
            "session_syncfed12as3-asd1-1a2s-asd1-a1sd2f345fg6.397",
          ),
        ],
        "session_syncfed12as3-asd1-1a2s-asd1-a1sd2f345fg6.397",
      ),
      createWindow(
        [
          createDummyTabItem(
            "아티클 홈 - 리디셀렉트",
            "https://select.ridibooks.com/article/home",
            "session_syncfed12as3-asd1-1a2s-asd1-a1sd2f345fg6.397",
          ),
          createDummyTabItem(
            "연구소 - 웨일 연구소",
            "https://forum.whale.naver.com/",
            "session_syncfed12as3-asd1-1a2s-asd1-a1sd2f345fg6.397",
          ),
        ],
        "session_syncfed12as3-asd1-1a2s-asd1-a1sd2f345fg6.397",
      ),
    ]),
  );

  devices.push(
    createDummyDevice("SM-T870", 3600000, [
      createWindow(
        [
          createDummyTabItem(
            "사이드바 방문 기록: 웨일 스토어",
            "https://store.whale.naver.com/detail/aomdaciidffjjcoeeammnhbahiopjelm",
            "session_syncfed12as3-asd1-1a2s-asd1-a1sd2f345fg6.397",
          ),
          createDummyTabItem(
            "사이드바 방문 기록: 웨일 스토어",
            "https://store.whale.naver.com/detail/aomdaciidffjjcoeeammnhbahiopjelm",
            "session_syncfed12as3-asd1-1a2s-asd1-a1sd2f345fg6.397",
          ),
        ],
        "session_syncfed12as3-asd1-1a2s-asd1-a1sd2f345fg6.397",
      ),
    ]),
  );

  const errorMessage = "";

  return (
    <SyncedTabsView
      syncStatus={syncStatus}
      devices={devices}
      errorMessage={errorMessage}
      onManualSync={() => {}}
    />
  );
}

// timeDiff < 3600000
function createDummyDevice(
  deviceName: string,
  timeDiff: number,
  windows: chrome.windows.Window[],
): chrome.sessions.Device {
  const sessionLastModified = Number.parseInt(
    `${(Date.now() - timeDiff) / 1000}`,
    10,
  );

  const sessions = windows.map((window) =>
    createSession(sessionLastModified, window),
  );

  const result: chrome.sessions.Device = {
    deviceName,
    sessions,
  };

  return result;
}

function createSession(
  lastModified: number,
  window: chrome.windows.Window,
): chrome.sessions.Session {
  const result: chrome.sessions.Session = {
    lastModified,
    window,
  };

  return result;
}

function createWindow(
  tabs: chrome.tabs.Tab[],
  sessionId: string,
): chrome.windows.Window {
  const result: chrome.windows.Window = {
    tabs,
    alwaysOnTop: false,
    focused: false,
    state: "normal",
    incognito: false,
    type: "normal",
    id: getRandomInt(1, 10),
    sessionId,
  };

  return result;
}

function getRandomInt(minP: number, maxP: number) {
  const min = Math.ceil(minP);
  const max = Math.floor(maxP);
  return Math.floor(Math.random() * (max - min)) + min; // 최댓값은 제외, 최솟값은 포함
}

// session_syncfed12as3-asd1-1a2s-asd1-a1sd2f345fg6.397
function createDummyTabItem(
  title: string,
  url: string,
  sessionId: string,
): whale.tabs.Tab {
  const result: whale.tabs.Tab = {
    title,
    url,
    sessionId,
    index: 0,
    pinned: false,
    windowId: 0,
    highlighted: false,
    active: false,
    incognito: false,
    selected: false,
    discarded: false,
    autoDiscardable: false,
  };

  return result;
}

// eslint-disable-next-line no-unused-vars
function createDummyTabItems(
  tabData: {
    title: string;
    url: string;
    sessionId: string;
  },
  count: number,
): whale.tabs.Tab[] {
  const { title, url, sessionId } = tabData;

  const result = new Array(count).fill(null).map(() => {
    const tabItem = createDummyTabItem(title, url, sessionId);

    return tabItem;
  });

  return result;
}
