import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.scss";

// prevent page url change by drag&drop the link
// 링크 드래그 앤 드롭을 통한 페이지 전환 방지
//
// reference: https://developers.whale.naver.com/tutorials/sidebarAction/#%ED%83%90%EC%83%89%EB%B0%94
window.addEventListener(
  "dragover",
  event => {
    const evt = event;
    evt.preventDefault();
    evt.dataTransfer.effectAllowed = "none";
    evt.dataTransfer.dropEffect = "none";
  },
  false
);
window.addEventListener(
  "drop",
  event => {
    const evt = event;
    evt.preventDefault();
    evt.dataTransfer.effectAllowed = "none";
    evt.dataTransfer.dropEffect = "none";
  },
  false
);

ReactDOM.render(<App />, document.getElementById("root"));
