import React, { useState } from "react";
import { PageContainer, SectionContainer } from "../../common";

import "./index.scss";

import { Key, setStorageData } from "../../storage";

function renderAnnounceMessage(messageName: string) {
  return (
    <div className="announce">
      {whale.i18n.getMessage(messageName) || messageName}
    </div>
  );
}

function Announcement() {
  const [isShow, setIsShow] = useState<Boolean>(true);

  function onNeverSeeAgain() {
    setStorageData(Key.isAnnouncementNeverSeeAgain, true);
    setIsShow(false);
  }
  function onClose() {
    setIsShow(false);
  }

  if (isShow === false) {
    return null;
  }

  return (
    <PageContainer
      id="announcement"
      title={whale.i18n.getMessage("announcement") || "announcement"}
      desc={whale.i18n.getMessage("announcement__desc") || "announcement__desc"}
    >
      <div className="announcement-content">
        <SectionContainer
          title={
            whale.i18n.getMessage("announcement__notice") ||
            "announcement__notice"
          }
        >
          {renderAnnounceMessage("announcement__notice_1")}
          {/* announcement__notice_1 */}
          {/* 이 확장앱은 웨일 공식 확장앱이 아닌, 개인 유저가 제작한 확장앱입니다. */}
          {renderAnnounceMessage("announcement__notice_2")}
          {/* announcement__notice_2 */}
          {/* 개선 및 문제점은 웨일 스토어 댓글에 남겨주세요. (최하단의 '리뷰 남기기' 클릭) */}
        </SectionContainer>
        <div style={{ height: "12px" }} />
        <SectionContainer
          title={
            whale.i18n.getMessage("announcement__tip") || "announcement__tip"
          }
        >
          {renderAnnounceMessage("announcement__tip_1")}
          {/* announcement__tip_1 */}
          {/* '다른 기기의 탭' 목록은 이 페이지가 열릴 때 자동으로 동기화됩니다. '수동 동기화' 기능은 실시간 변동이 필요할 때만 사용하시면 됩니다. */}
          {renderAnnounceMessage("announcement__tip_2")}
          {/* announcement__tip_2 */}
          {/* '방문 기록'은 현재 기기의 기록만 표시됩니다. 다른 기기의 기록을 포함한 전체 기록을 확인하시려면 최상단의 '웨일 방문 기록 페이지로'를 클릭해주세요. */}
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
