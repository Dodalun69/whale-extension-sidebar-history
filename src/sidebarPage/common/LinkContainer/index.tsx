import React from "react";
import styled from "styled-components";
import Favicon from "../Favicon";

type LinkContainerProps = {
  title: string;
  url: string;
  favIconUrl?: string;
};

export default function LinkContainer({
  title,
  url,
  favIconUrl,
}: LinkContainerProps) {
  return (
    <Wrapper>
      <LinkWrapper
        href={url}
        title={title || url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaviconWrapper>
          <Favicon favIconUrl={favIconUrl} url={url} />
        </FaviconWrapper>
        <Title className="title">{title || url}</Title>
      </LinkWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 20px;
  padding-left: 8px;
  padding-right: 8px;

  white-space: nowrap;
  display: flex;

  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0px;
  }
`;

const LinkWrapper = styled.a`
  width: 100%;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const FaviconWrapper = styled.div`
  margin-right: 8px;
`;

const Title = styled.div`
  padding-right: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--primary-font-color);
  font-size: var(--primary-small-font-size);
`;
