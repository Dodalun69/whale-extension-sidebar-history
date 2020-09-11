import React from "react";

import "./index.scss";

type Props = {
  id?: string;
  title: string;
  desc: string;
  children: React.ReactNode;
};

function PageContainer({ id, title, desc, children }: Props) {
  return (
    <div id={id} className="page-container">
      <hr />
      <header>
        <div className="title-container">
          <h1>{title}</h1>
        </div>
        <div className="desc-container">
          <p>{desc}</p>
        </div>
      </header>
      <div className="content">{children}</div>
    </div>
  );
}

export default PageContainer;
