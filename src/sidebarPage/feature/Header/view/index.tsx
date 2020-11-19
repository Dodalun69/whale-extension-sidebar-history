import React from "react";
import styled from "styled-components";

import * as whaleApi from "@src/util/whaleApi";

export default function Header() {
  return (
    <HeaderWrapper>
      <FlexWrapper>
        <Title>{whaleApi.i18nGetMessage("header__title")}</Title>
        <OpenHistoryPagebutton
          type="button"
          onClick={() => whale.tabs.create({ url: "whale://history/" })}
        >
          {whaleApi.i18nGetMessage("header__open_whale_history_page")}
        </OpenHistoryPagebutton>
      </FlexWrapper>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;

  background-color: var(--primary-background-color);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const FlexWrapper = styled.div`
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  color: var(--primary-font-color);
  font-size: var(--primary-big-font-size);
  font-weight: 700;
`;

const OpenHistoryPagebutton = styled.button`
  all: unset;

  color: var(--primary-font-light-color);
  font-size: var(--primary-small-font-size);
  font-family: inherit;
`;
