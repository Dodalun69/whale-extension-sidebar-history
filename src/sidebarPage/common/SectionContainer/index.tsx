import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  option?: React.ReactNode;
  collapsibleConfigure?: {
    defaultStatus: boolean;
    isFixed?: boolean;
  };
  children: React.ReactNode;
};

export default function SectionContainer({
  title,
  option,
  collapsibleConfigure = {
    defaultStatus: true,
    isFixed: false,
  },
  children,
}: Props) {
  const { defaultStatus, isFixed } = collapsibleConfigure;
  const [isOpenState, setIsOpenState] = useState<boolean>(defaultStatus);

  function onClick() {
    if (isFixed) {
      return;
    }
    setIsOpenState(!isOpenState);
  }

  return (
    <Wrapper>
      <Header onClick={onClick} role="button" tabIndex={0}>
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
        <Option
          className="option"
          onClick={(e) => {
            e.stopPropagation();
          }}
          role="button"
          tabIndex={0}
        >
          {option || null}
        </Option>
      </Header>
      {isOpenState && (
        <>
          <hr />
          <ContentWrapper>{children}</ContentWrapper>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: var(--primary-background-color);

  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const Header = styled.div`
  padding-left: 8px;
  padding-right: 8px;

  padding-top: 12px;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:focus {
    outline: none;
  }
`;

const Option = styled.div`
  &:focus {
    outline: none;
  }
`;

const TitleWrapper = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  color: var(--primary-font-color);
  font-size: var(--primary-medium-font-size);
`;

const ContentWrapper = styled.div`
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: var(--primary-background-color);
`;
