import React, { useState, useEffect } from "react";

import "./DateSelector.scss";

type DateSelectorProps = {
  TODAY: number;
  onSelect: (date: Date) => void;
};

function DateSelector({ TODAY, onSelect }: DateSelectorProps) {
  // 최대 14일(2주) 전 까지만 선택 가능하도록 지정
  // (수치를 14일로 지정한 것에 특별한 의미는 없습니다)
  const SELECT_LENGTH = 14;

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
          message: `${date.getFullYear()} / ${date.getMonth() +
            1} / ${date.getDate()}`
        };

        if (index === 0) {
          // "{날짜} (오늘)"
          result.message = `${result.message} (${whale.i18n.getMessage(
            "history__today"
          )})`;
        } else if (index === 1) {
          // "{날짜} (어제)"
          result.message = `${result.message} (${whale.i18n.getMessage(
            "history__yesterday"
          )})`;
        }

        return result;
      })
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
    <div id="date-selector">
      <div className="title">
        {whale.i18n.getMessage("history__select_date")}
      </div>
      <div className="selector">
        <select onChange={onSelectorChange} defaultValue={selectedDateTime}>
          {dateTimeOptions.map(({ time, message }) => (
            <option value={time}>{message}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default DateSelector;
