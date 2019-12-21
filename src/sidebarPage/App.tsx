import React from "react";
import "./App.scss";

function App() {
  // 다음 코드는 다국어 지원 API인 i18n 사용 방법,
  // 이미지 참조 방법을 알려드리기 위한 예시입니다.
  // 자유롭게 수정해주세요.
  return (
    <div className="App">
      <h1>{whale.i18n.getMessage("title") || "title"}</h1>
      <h3>
        {whale.i18n.getMessage("if_message_match_failed") ||
          "if_message_match_failed"}
      </h3>
      <h1>Sidebar Page</h1>
      <div>
        <img alt="sample" src="/img/sample.png" />
        <div>Sample Image</div>
      </div>
    </div>
  );
}

export default App;
