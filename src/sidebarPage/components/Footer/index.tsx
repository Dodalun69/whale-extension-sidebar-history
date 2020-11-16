import React from "react";
import styled from "styled-components";

import * as whaleApi from "../../../util/whaleApi";

function renderItem(title: string, url: string) {
  function onClickHandler() {
    whale.tabs.create({ url });
  }
  return (
    <LinkButton type="button" onClick={onClickHandler}>
      {title}
    </LinkButton>
  );
}

const LinkButton = styled.button`
  all: unset;

  color: var(--primary-font-light-color);
  font-size: var(--primary-small-font-size);
  font-family: inherit;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <hr />
      <LinkButtonsWrapper>
        {renderItem(
          "GitHub (BSD 3-clause)",
          "https://github.com/mate131909/whale-extension-sidebar-history",
        )}
        {renderItem(
          whaleApi.i18nGetMessage("footer__review"),
          "https://store.whale.naver.com/detail/aomdaciidffjjcoeeammnhbahiopjelm",
        )}
      </LinkButtonsWrapper>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  background-color: var(--primary-light-background-color);
`;

const LinkButtonsWrapper = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  height: 36px;

  display: flex;
  justify-content: space-around;
`;
