import React, { useState } from "react";
import "./index.scss";

type Props = {
  id?: string;
  title: string;
  option?: React.ReactNode;
  subTitle?: string;
  collapsibleConfigure?: {
    defaultStatus: boolean;
    isFixed?: boolean;
  };
  children: React.ReactNode;
};

function SectionContainer({
  id,
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
    <div id={id} className="section-container">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <header onClick={onClick} role="button" tabIndex={0}>
        <div className="title-container">
          <h1 className="title">{title}</h1>
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          className="option"
          onClick={(e) => {
            e.stopPropagation();
          }}
          role="button"
          tabIndex={0}
        >
          {option || null}
        </div>
      </header>
      {isOpenState ? <div className="content">{children}</div> : <div />}
    </div>
  );
}

export default SectionContainer;
