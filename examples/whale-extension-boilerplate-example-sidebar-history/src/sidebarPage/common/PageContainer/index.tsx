import React from "react";
import "./index.scss";

type PageContainerProps = {
  id?: string;
  title: string;
  children: React.ReactNode;
};

function PageContainer({ id, title, children }: PageContainerProps) {
  return (
    <div id={id} className="page-container">
      <div className="header">
        <h1 className="title">{title}</h1>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}

export default PageContainer;
