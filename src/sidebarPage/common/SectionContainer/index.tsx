import React, { useState } from "react";

import "./index.scss";

type SectionContainerProps = {
  id?: string;
  title: string;
  subTitle?: string;
  children: React.ReactNode;
};

function SectionContainer({
  id,
  title,
  subTitle,
  children,
}: SectionContainerProps) {
  return (
    <div id={id} className="section-container">
      <div className="header">
        <div className="title-container">
          <h1 className="title">{title}</h1>
          {subTitle ? <h2 className="sub-title">{subTitle}</h2> : null}
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}

export default SectionContainer;
