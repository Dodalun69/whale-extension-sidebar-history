import React from "react";
import styled from "styled-components";

type Props = {
  title: string;
  option: React.ReactNode;
  children: React.ReactNode;
};

export default function PageContainer({ title, option, children }: Props) {
  return (
    <PageWrapper>
      <Header>
        <div style={{ width: "100%" }}>
          <Title>{title}</Title>
          <OptionWrapper>{option}</OptionWrapper>
          {/* <Description>{desc}</Description> */}
        </div>
      </Header>
      <ContentWrapper>{children}</ContentWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div``;

const Header = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: var(--primary-background-color);

  display: flex;
  align-content: center;
`;

const Title = styled.div`
  color: var(--primary-font-color);
  font-size: var(--primary-big-font-size);

  font-weight: 700;
`;

const OptionWrapper = styled.div`
  margin-top: 6px;
  font-size: var(--primary-small-font-size);
  color: var(--primary-font-light-color);
`;

const ContentWrapper = styled.div`
  background-color: var(--primary-light-background-color);
  padding-left: 20px;
  padding-right: 20px;

  padding-top: 16px;
  padding-bottom: 16px;
`;
