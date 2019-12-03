import React from "react";
import { PageContainer } from "../../common";

import "./index.scss";

type ReferenceItemProps = {
  title: string;
  url: string;
};

function ReferenceItem({ title, url }: ReferenceItemProps) {
  return (
    <div className="reference-item">
      <a href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </div>
  );
}

function Reference() {
  return (
    <PageContainer id="reference" title={whale.i18n.getMessage("reference")}>
      <ReferenceItem
        title={whale.i18n.getMessage("reference__open_whale_developer_center")}
        url="https://developers.whale.naver.com/"
      />
      <hr />
      <ReferenceItem
        title={whale.i18n.getMessage(
          "reference__open_github_whale_extension_boilerplate_repository"
        )}
        url="https://github.com/mate131909/whale-extension-boilerplate"
      />
    </PageContainer>
  );
}

export default Reference;
