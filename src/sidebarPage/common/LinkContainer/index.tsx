import React from "react";
import Favicon from "../Favicon";

import "./index.scss";

type LinkContainerProps = {
  title: string;
  url: string;
  favIconUrl?: string;
};

function LinkContainer({ title, url, favIconUrl }: LinkContainerProps) {
  return (
    <div className="link-container">
      <a
        href={url}
        title={title || url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Favicon favIconUrl={favIconUrl} url={url} />
        <div className="title">{title || url}</div>
      </a>
    </div>
  );
}

export default LinkContainer;
