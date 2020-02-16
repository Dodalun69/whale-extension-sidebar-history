import React, { useState, useEffect } from "react";
import { PageContainer, SectionContainer } from "../../common";

import "./index.scss";

import { Key, getStorageData, setStorageData } from "../../storage";

function Announcement() {
  const [isShow, setIsShow] = useState<Boolean>(false);

  function onNeverSeeAgain() {
    setIsShow(false);
    setStorageData(Key.isAnnouncementNeverSeeAgain, true);
  }
  function onClose() {
    setIsShow(false);
  }

  function initial() {
    getStorageData(Key.isAnnouncementNeverSeeAgain).catch((error: Error) => {
      if (error.message === "undefined") {
        // 아직 값이 지정되지 않음(신규 설치)
        setIsShow(true);
      }
    });
  }

  useEffect(() => {
    initial();
  }, []);

  if (isShow === false) {
    return null;
  }

  return (
    <PageContainer
      id="announcement"
      title={whale.i18n.getMessage("announcement") || "announcement"}
    >
      <div className="announcement-content">
        <SectionContainer
          title={
            whale.i18n.getMessage("announcement__notice") ||
            "announcement__notice"
          }
        >
          <div className="announce">
            {whale.i18n.getMessage("announcement__notice_1") ||
              "announcement__notice_1"}
          </div>
          <div className="announce">
            {whale.i18n.getMessage("announcement__notice_2") ||
              "announcement__notice_2"}
          </div>
        </SectionContainer>
        <SectionContainer
          title={
            whale.i18n.getMessage("announcement__tip") || "announcement__tip"
          }
        >
          <div className="announce">
            {whale.i18n.getMessage("announcement__tip_1") ||
              "announcement__tip_1"}
          </div>
          <div className="announce">
            {whale.i18n.getMessage("announcement__tip_2") ||
              "announcement__tip_2"}
          </div>
        </SectionContainer>
      </div>
      <div className="button-container">
        <button
          type="button"
          className="never-see-again"
          onClick={onNeverSeeAgain}
        >
          {whale.i18n.getMessage("announcement__never_see_again") ||
            "announcement__never_see_again"}
        </button>
        <button type="button" className="close" onClick={onClose}>
          {whale.i18n.getMessage("announcement__close") ||
            "announcement__close"}
        </button>
      </div>
    </PageContainer>
  );
}

export default Announcement;
