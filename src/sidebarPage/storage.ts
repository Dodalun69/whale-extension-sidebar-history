export enum Key {
  // eslint-disable-next-line no-unused-vars
  isAnnouncementNeverSeeAgain = "is-announcement-never-see-again",
  // eslint-disable-next-line no-unused-vars
  isSyncedTabsPageOpen = "is-syncedtabs-page-open",
  // eslint-disable-next-line no-unused-vars
  isHistoryPageOpen = "is-history-page-open",
}

export async function getStorageData(key: Key): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    whale.storage.local.get([key], (result) => {
      if (result === undefined || result[key] === undefined) {
        reject(new Error("undefined"));
      }
      resolve(result[key]);
    });
  });
}

export async function setStorageData(key: Key, value: any) {
  return new Promise<any>((resolve) => {
    whale.storage.local.set({ [key]: value }, () => resolve());
  });
}
