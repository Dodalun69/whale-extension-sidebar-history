import React, { useState } from "react";
import { PageContainer } from "../../common";

import "./index.scss";

function Announcement() {
  const [isShow, setIsShow] = useState<Boolean>(true);
  function onNeverSeeAgain() {
    console.log("never see again");
    setIsShow(false);
  }

  if (isShow === false) {
    return null;
  }

  return (
    <PageContainer id="announcement" title="안내">
      <div className="announcement-content">
        <div>
          이 확장 프로그램은 웨일 공식 확장앱이
          <div
            style={{
              display: "inline-block",
              fontWeight: "bold",
              marginLeft: "3px",
            }}
          >
            아닙니다.
          </div>
        </div>
        <div style={{ height: "5px" }} />
        <div>유의하고 사용해주세요.</div>
      </div>
      <div className="button-container">
        <button
          type="button"
          className="never-see-again"
          onClick={onNeverSeeAgain}
        >
          <div>다시 보지 않기</div>
        </button>
      </div>
    </PageContainer>
  );
}

export default Announcement;
