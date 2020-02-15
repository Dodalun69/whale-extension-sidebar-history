import React, { useState } from "react";
import CollapseToggle from "./CollapseToggle";

import "./index.scss";

type CollapsibleSectionContainerProps = {
  id?: string;
  title: string;
  subTitle?: string;
  //  isOpen?: boolean;
  children: React.ReactNode;
};

function CollapsibleSectionContainer({
  id,
  title,
  subTitle,
  children,
}: //  isOpen: defaultIsOpen,
CollapsibleSectionContainerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id={id} className="collapsible-section-container">
      <div className="header">
        <div className="title-container">
          <h1 className="title">{title}</h1>
          {subTitle ? <h2 className="sub-title">{subTitle}</h2> : null}
        </div>
        <div className="control">
          <CollapseToggle isOpen={isOpen} onChange={toggleOpen} />
        </div>
      </div>
      {isOpen ? <div className="content">{children}</div> : <div />}
    </div>
  );
}

export default CollapsibleSectionContainer;
