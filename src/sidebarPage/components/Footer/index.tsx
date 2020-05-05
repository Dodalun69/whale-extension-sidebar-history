import React from "react";
import "./index.scss";

import * as whaleApi from "../../../util/whaleApi";

function renderItem(title: string, url: string) {
  function onClickHandler() {
    whale.tabs.create({ url });
  }
  return (
    <button type="button" onClick={onClickHandler}>
      {title}
    </button>
  );
}

function Footer() {
  return (
    <div id="footer">
      <hr />
      <div className="item-container">
        {renderItem(
          "GitHub (BSD 3-clause)",
          "https://github.com/mate131909/whale-extension-sidebar-history",
        )}
        {renderItem(
          whaleApi.i18nGetMessage("footer__review"),
          "https://store.whale.naver.com/detail/aomdaciidffjjcoeeammnhbahiopjelm",
        )}
      </div>
    </div>
  );
}

export default Footer;
