import React from "react";

import "./index.scss";

import CollapseToggle from "./CollapseToggle";

type PageContainerProps = {
  id?: string;
  title: string;
  isOpen?: boolean;
  onToggleOpen?: (nextStateIsOpen: boolean) => void;
  children: React.ReactNode;
};

function CollapsiblePageContainer({
  id,
  title,
  isOpen,
  onToggleOpen,
  children,
}: PageContainerProps) {
  const toggleOpen = () => {
    onToggleOpen(!isOpen);
  };

  return (
    <div id={id} className="collapsible-page-container">
      <div className="header">
        <div className="title-container">
          <h1 className="title">{title}</h1>
        </div>
        <div className="control-container">
          <CollapseToggle isOpen={isOpen} onChange={toggleOpen} />
        </div>
      </div>
      {isOpen ? <div className="content">{children}</div> : <div />}
    </div>
  );
}

export default CollapsiblePageContainer;
