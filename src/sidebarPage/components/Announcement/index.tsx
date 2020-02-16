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
    <PageContainer id="announcement" title="안내">
      <div className="announcement-content">
        <SectionContainer title="공지">
          <div className="announce">
            이 확장앱은 웨일 공식 확장앱이 아닌, 개인 유저가 제작한
            확장앱입니다.
          </div>
          <div className="announce">
            개선 및 문제점은 웨일스토어 댓글에 남겨주세요.
          </div>
        </SectionContainer>
        <SectionContainer title="팁">
          <div className="announce">
            '다른 기기의 탭' 목록은 이 페이지가 열릴때 자동으로 동기화됩니다.
            '수동 동기화' 기능은 실시간 변동이 필요할 때만 사용하시면 됩니다.
          </div>
          <div className="announce">
            '방문 기록'의 목록은 현재 기기의 기록만 나타납니다. 다른 기기의
            기록을 포함한 전체 기록을 확인할 땐, 최상단의 '웨일 방문기록
            페이지로' 를 클릭해주세요.
          </div>
        </SectionContainer>
      </div>
      <div className="button-container">
        <button
          type="button"
          className="never-see-again"
          onClick={onNeverSeeAgain}
        >
          다시 보지 않기
        </button>
        <button type="button" className="close" onClick={onClose}>
          닫기
        </button>
      </div>
    </PageContainer>
  );
}

export default Announcement;
