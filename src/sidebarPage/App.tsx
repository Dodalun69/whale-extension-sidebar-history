import React from "react";

import "./global.scss";

import styled from "styled-components";

import Header from "./components/Header";
import SyncedTabs from "./components/SyncedTabs";
import History from "./components/History";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Wrapper>
      <Header />
      <ContentWrapper>
        <SyncedTabs />
        <div style={{ height: "16px" }} />
        <History />
      </ContentWrapper>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
`;

const ContentWrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;

  min-height: calc(100vh - (50px + 100px + 37px));
`;
