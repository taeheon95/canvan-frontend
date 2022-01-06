import React, { useMemo, useState } from "react";
import styled from "styled-components";
import palette from "../lib/styles/palette";

const today = new Date();

const viewMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const weekend = ["일", "월", "화", "수", "목", "금", "토"];

const CalendarTable = styled.div`
  height: 630px;
  width: 700px;
  background-color: ${palette.gray[2]};
`;

const Weekend = styled.div`
  display: flex;
  width: 700px;
  height: 30px;
`;

const WeekDay = styled.div`
  flex: 1;
  border-style: solid;
  border-width: 0.1px;
  border-radius: 10px;
  text-align: center;
  :hover {
    background-color: ${palette.violet[2]};
  }
`;
const Week = styled.div`
  display: flex;
  height: 100px;
`;

const Days = styled.div<{ dateColor: string }>`
  flex: 1;
  border: 0.1px solid;
  color: ${(props) => props.dateColor};
`;

function Calendar() {
  const [date, setDate] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const MonthAllDate = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);

  return (
    <CalendarTable>
      <Weekend>
        {weekend.map((days) => (
          <WeekDay key={days}>{days}</WeekDay>
        ))}
      </Weekend>
      {/* {MonthAllDate} */}
      {Array.from({ length: 6 }, (v, weekIndex) => (
        <WeekLine
          key={`${year}_${month}_${weekIndex}`}
          year={year}
          month={month}
          weekIndex={weekIndex}
        />
      ))}
    </CalendarTable>
  );
}

function WeekLine(props: { weekIndex: number; year: number; month: number }) {
  const { weekIndex, year, month } = props;

  return (
    <Week>
      {Array.from({ length: 7 }, (v, dayIndex) => (
        <Day
          key={weekIndex * 7 + dayIndex}
          weekIndex={weekIndex}
          dayIndex={dayIndex}
          year={year}
          month={month}
        />
      ))}
    </Week>
  );
}
function Day(props: {
  weekIndex: number;
  dayIndex: number;
  year: number;
  month: number;
}) {
  const { weekIndex, dayIndex, year, month } = props;

  const firstDayIndex = useMemo(() => {
    return new Date(year, month, 1).getDay();
  }, [year, month]);

  const dateNum = useMemo(() => {
    return weekIndex * 7 + dayIndex - firstDayIndex + 1;
  }, [weekIndex, dayIndex, firstDayIndex]);

  const viewDate = useMemo(() => {
    return new Date(year, month, dateNum).getDate();
  }, [year, month, dateNum]);

  const MonthAllDate = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);

  const dateColor = useMemo(() => {
    return dateNum > 0 && dateNum <= MonthAllDate ? "black" : palette.indigo[5];
  }, [dateNum, MonthAllDate]);

  return <Days dateColor={dateColor}>{viewDate}</Days>;
}

export default Calendar;
