import React, { useState } from "react";

import "./index.scss";

import { CollapseToggle } from "..";

type PageContainerProps = {
  id?: string;
  title: string;
  options?: React.ReactNode;
  children: React.ReactNode;
};

function PageContainer({ id, title, options, children }: PageContainerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id={id} className="page-container">
      <div className="header">
        <div className="title-container">
          <h1 className="title">{title}</h1>
        </div>
        <div className="control">{options || null}</div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}

export default PageContainer;
