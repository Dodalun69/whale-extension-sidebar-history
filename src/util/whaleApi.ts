export async function sessionsGetDevices(
  filter: chrome.sessions.Filter,
): Promise<chrome.sessions.Device[]> {
  return new Promise((resolve, reject) => {
    try {
      chrome.sessions.getDevices(filter, data => {
        resolve(data);
      });
    } catch (error) {
      console.error("failed to getDevices", error);
      reject(error);
    }
  });
}

export async function tabsQuery(
  queryInfo: chrome.tabs.QueryInfo,
): Promise<chrome.tabs.Tab[]> {
  return new Promise((resolve, reject) => {
    try {
      whale.tabs.query(queryInfo, tabs => {
        resolve(tabs);
      });
    } catch (error) {
      console.error("failed to tabsQuery", error);
      reject(error);
    }
  });
}

export async function tabsGet(tabId: number): Promise<chrome.tabs.Tab> {
  return new Promise((resolve, reject) => {
    try {
      whale.tabs.get(tabId, tab => {
        resolve(tab);
      });
    } catch (error) {
      console.error("failed to tabsGet", error);
      reject(error);
    }
  });
}

export async function historySearch(
  query: chrome.history.HistoryQuery,
): Promise<whale.history.HistoryItem[]> {
  return new Promise((resolve, reject) => {
    try {
      whale.history.search(query, (results: whale.history.HistoryItem[]) => {
        resolve(results);
      });
    } catch (error) {
      console.error("failed to historySearch", error);
      reject(error);
    }
  });
}

export async function sidebarActionOnClickedAddListener(
  opened: boolean,
  callback: () => void,
) {
  whale.sidebarAction.onClicked.addListener(result => {
    // result object: https://developers.whale.naver.com/api/extensions/sidebarAction/#onClicked
    //
    // eslint-disable-next-line dot-notation
    if (result["opened"] === opened) {
      callback();
    }
  });
}

export function i18nGetMessage(messageId: string) {
  return whale.i18n.getMessage(messageId) || messageId;
}
