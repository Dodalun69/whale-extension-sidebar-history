import React, { useState, useEffect } from "react";
import styled from "styled-components";

import * as whaleApi from "@src/util/whaleApi";

type DateSelectorProps = {
  TODAY: number;
  onSelect: (date: Date) => void;
};

export default function DateSelector({ TODAY, onSelect }: DateSelectorProps) {
  // 최대 10일 전 까지만 선택 가능하도록 지정
  const SELECT_LENGTH = 10;

  const [dateTimeOptions, setDateTimeOptions] = useState<
    { time: number; message: string }[]
  >([]);
  const [selectedDateTime, setSelectedDateTime] = useState<number>(TODAY);

  useEffect(() => {
    setDateTimeOptions(
      new Array(SELECT_LENGTH).fill(null).map((_, index) => {
        const date = new Date(TODAY);
        date.setDate(date.getDate() - index);

        const result = {
          time: date.getTime(),
          message: `${date.getFullYear()} / ${
            date.getMonth() + 1
          } / ${date.getDate()}`,
        };

        if (index === 0) {
          // "{날짜} (오늘)"
          result.message = `${result.message} (${whaleApi.i18nGetMessage(
            "general__today",
          )})`;
        } else if (index === 1) {
          // "{날짜} (어제)"
          result.message = `${result.message} (${whaleApi.i18nGetMessage(
            "general__yesterday",
          )})`;
        }

        return result;
      }),
    );
  }, [TODAY]);

  function onSelectorChange(event) {
    const { value } = event.target;
    // value 의 타입은 string 이기 때문에,
    // 유닉스 타임스탬프로 생성하려면 parseInt 로 변경해줘야 함
    const time = parseInt(value, 10);

    setSelectedDateTime(time);
    onSelect(new Date(time));
  }

  return (
    <Wrapper>
      <Selector onChange={onSelectorChange} defaultValue={selectedDateTime}>
        {dateTimeOptions.map(({ time, message }) => (
          <option key={time} value={time}>
            {message}
          </option>
        ))}
      </Selector>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-size: var(--primary-small-font-size);
`;

const Selector = styled.select`
  outline: none;
  -webkit-appearance: none;
  /* border: none; */
  border-color: var(--primary-border-color);
  background: url(/img/arrow-down.svg) calc(100% - 15px) center no-repeat;
  background-size: 12px;
  background-color: var(--primary-background-color);
  color: var(--primary-font-color);
  min-width: 180px;
  padding: 4px 16px 4px 12px;

  @media (prefers-color-scheme: dark) {
    color: var(--primary-font-light-color);
  }
`;
