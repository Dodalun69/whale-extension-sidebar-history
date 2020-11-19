import React from "react";

import styled from "styled-components";
import * as whaleApi from "@src/util/whaleApi";
import { SectionContainer } from "@src/sidebarPage/common";
import HistoryList from "./HistoryList";

type Props = {
  domain: string | null;
  historys: whale.history.HistoryItem[];
};

export default function CurrentSiteHistory({ domain, historys }: Props) {
  if (domain === null) {
    return (
      <SectionContainer
        title={whaleApi.i18nGetMessage("history__current_site_history")}
        option={<CurrentSiteDomain>unknown</CurrentSiteDomain>}
      >
        <HistoryList
          historys={[]}
          fallbackMessage={whaleApi.i18nGetMessage(
            "history__current_site_history__unknown_site",
          )}
        />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      title={whaleApi.i18nGetMessage("history__current_site_history")}
      option={<CurrentSiteDomain>{domain}</CurrentSiteDomain>}
    >
      <HistoryList
        historys={historys}
        fallbackMessage={whaleApi.i18nGetMessage(
          "history__current_site_history__no_history_data",
        )}
      />
    </SectionContainer>
  );
}

const CurrentSiteDomain = styled.div`
  max-width: 140px;
  font-size: var(--primary-small-font-size);
  color: var(--primary-font-light-color);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
